const MemoizeImmutable = require('memoize-immutable')
const Immutable = require('immutable')

const Constants = require('./Constants.js')
const CategoryComputations = require('./CategoryComputations.js')
const IncidentComputations = require('./IncidentComputations.js')

const WorkspaceComputations = {}



// Is the map on display?
// columns: the columns state
WorkspaceComputations.mapDisplayed = function(columns) {
  return columns.contains('map')
}


// The height of top bar, containing a heading, subheading, and home icon
// NB: Thanks to memoize-immutable, this function is effectively always memoized
WorkspaceComputations.topBarHeight = function () {
  let height = Constants.get('topOuterMargin')
  const lineHeight = Constants.getIn(['topBar', 'headingLineHeight'])

  height += Constants.getIn(['topBar', 'headingFontSize']) * lineHeight
  height += Constants.getIn(['topBar', 'subheadingFontSize']) * 2 * lineHeight
  height += Constants.getIn(['topBar', 'topBarBottomMargin'])

  return height
}

// This is the entire height of the column, including all its decorations
// viewport: the viewport state
WorkspaceComputations.columnHeight = function (viewport) {
  return viewport.get('y') - 
         WorkspaceComputations.topBarHeight() - 
         Constants.get('bottomOuterMargin') -
         Constants.get('columnHeadingHeight')
}


// NB: this is the width of ordinary columns, not the map column
// columns: the columns state
WorkspaceComputations.columnWidth = function (columns) {
  if (WorkspaceComputations.useScrollingWorkspace(columns)) {
    return Constants.get('columnNarrowWidth')
  }
  else {
    return Constants.get('columnWideWidth')
  }
}


WorkspaceComputations.columnY = function() {
  return WorkspaceComputations.topBarHeight() + 
         Constants.get('columnHeadingHeight')
}



// columns: the columns state
WorkspaceComputations.sidebarWidth = function (columns) {
  let width = Constants.getIn(['sidebar', 'columWidth'])
  const columnCount = (Constants.get('columnNames').count() - columns.count() - 1)
  width += Constants.getIn(['sidebar', 'columnOffset']) * columnCount
  return width
}




// The number of 'ordinary' columns on display right now
WorkspaceComputations.ordinaryColumnsCount = function(columns) {

  let ordinaryColumnsCount = columns.count()
  if (WorkspaceComputations.mapDisplayed(columns)) {
    // The map column doesn't count as an ordinary column
    ordinaryColumnsCount -= 1
  }
 
  return ordinaryColumnsCount
}

// The maximum number of columns which may be present before we should extend 
// the SVG beyond the viewport, so that it scrolls, and so that we have more
// space to lay out elements.
WorkspaceComputations.maxColumnsWithoutScroll = function (columns) {
  if (WorkspaceComputations.mapDisplayed(columns)) {
    return Constants.get('maxColumnsWithoutScrollWithMap')
  }
  else {
    return Constants.get('maxColumnsWithoutScroll')
  }

}

WorkspaceComputations.dragArrowX = function (columns, xCoordinate) {
  const columnWidth = WorkspaceComputations.columnWidth(columns)
  const dragArrowWidth = Constants.getIn(['dragArrow', 'width'])

  return xCoordinate + columnWidth / 2 - dragArrowWidth / 2
}

// NB: Also used to position the show empty categories label
WorkspaceComputations.dragArrowY = function (viewport) {
  return WorkspaceComputations.columnY() + 
         WorkspaceComputations.columnHeight(viewport) +
         Constants.getIn(['dragArrow', 'topMargin'])
}

// Should we use math that can produce a horizontally scrolling workspace, or 
// not?
WorkspaceComputations.useScrollingWorkspace = function (columns) {
  const ordinaryColumnsCount = WorkspaceComputations.ordinaryColumnsCount(columns)
  const maxColumnsWithoutScroll = WorkspaceComputations.maxColumnsWithoutScroll(columns)

  return ordinaryColumnsCount > maxColumnsWithoutScroll
}




// Returns an immutable map of category names to category heights, for the given
// column name.
// viewport: the viewport state
// data: the data state
// categories: the category display state
WorkspaceComputations.categoryHeights = function (showEmptyCategories, viewport, data, columns, categories, columnName) {

  const columnHeight = WorkspaceComputations.columnNormalCategoryHeight(showEmptyCategories, viewport, data, columns, categories)

  const relatedHiddenCategories = CategoryComputations.relatedHiddenCategories(data, columns, categories, columnName)

  // TODO: currently, we place no limits on the space the related hidden
  // categories can take up. I suspect this number will always be small, but if
  // it turns out to be large, we may need to cap it.
  const relatedHiddenCategoryHeight = relatedHiddenCategories.count() * Constants.get('emptyCategoryHeight')

  const availableColumnHeight = columnHeight - relatedHiddenCategoryHeight

  const filteredData = IncidentComputations.filteredIncidents(data, columns, categories)

  // Due to multiple selection categories (where an incident can appear in
  // multiple categories) the number of items we have to display can be larger
  // (or even smaller) than the number of incidents.
  const itemsInColumn = CategoryComputations.itemsInColumn(filteredData, categories, columnName)

  const heightPerItem = availableColumnHeight / itemsInColumn

  const displayedCategories = CategoryComputations.displayedCategories(data, columns, categories, columnName)

  return displayedCategories.map( (present, categoryName) => {
    if (relatedHiddenCategories.get(categoryName) === true) {
      // This item is a related hidden category, so it gets a fixed height
      return Constants.get('emptyCategoryHeight')
    }
    else {
      const items = CategoryComputations.itemsInCategory(filteredData, columnName, categoryName)
      return items * heightPerItem
    }
  })
    .filter( (height) => height > 0)

}


// Returns a map of category names to an object with y coordinate and height,
// for laying out categories vertically
WorkspaceComputations.categoryVerticalPositions = function (showEmptyCategories, viewport, data, columns, categories, columnName) {

  const categoryHeights = WorkspaceComputations.categoryHeights(showEmptyCategories, viewport, data, columns, categories, columnName) 

  const displayedCategories = CategoryComputations.displayedCategories(data, columns, categories, columnName)

  let categoryY = WorkspaceComputations.columnY()

  return displayedCategories.map( (visible, categoryName) => {
    const currentY = categoryY
    categoryY += categoryHeights.get(categoryName)

    return Immutable.Map({
      height: categoryHeights.get(categoryName),
      y: currentY
    })

  })

}



// Returns a map of category names to an object with y coordinate and height,
// for laying out the categories of the leftmost sidebar column only
WorkspaceComputations.sidebarCategoryVerticalPositions = function (showEmptyCategories, viewport, data, columns, categories, columnName) {

  const sidebarMeasurements = WorkspaceComputations.horizontalPositions(
    showEmptyCategories,
    viewport,
    data,
    columns,
    categories)
    .get('sideBar')

  const columnHeight = WorkspaceComputations.rightSidebarColumnHeight(sidebarMeasurements.get('height'), columns)

  const categoryHeights = WorkspaceComputations.sideBarCategoryHeights(
    columnHeight,
    showEmptyCategories,
    viewport,
    data, 
    columns,
    categories, 
    columnName
  )

  let categoryY = sidebarMeasurements.get('y')

  // TODO: use this in column paths maybe, and both should use 
  // displayedCategories instead of filtering it themselves
  return categories.get(columnName)
    .filter( (visible) => visible === true)
    .filter( (visible, categoryName) => categoryHeights.get(categoryName) !== undefined)
    .map( (visible, categoryName) => {
      const currentY = categoryY
      categoryY += categoryHeights.get(categoryName)

      return Immutable.Map({
        height: categoryHeights.get(categoryName),
        y: currentY,
      })
    })

}


// Returns an immutable map of category names to category heights, for the given
// column name in the sidebar.
WorkspaceComputations.sideBarCategoryHeights = function (columnHeight, showEmptyCategories, viewport, data, columns, categories, columnName) {
  const relatedHiddenCategories = CategoryComputations.relatedHiddenCategories(data, columns, categories, columnName)

  // TODO: currently, we place no limits on the space the related hidden
  // categories can take up. I suspect this number will always be small, but if
  // it turns out to be large, we may need to cap it.
  const relatedHiddenCategoryHeight = relatedHiddenCategories.count() * Constants.get('emptyCategoryHeight')

  const availableColumnHeight = columnHeight - relatedHiddenCategoryHeight

  const filteredData = IncidentComputations.filteredIncidents(data, columns, categories)

  // Due to multiple selection categories (where an incident can appear in
  // multiple categories) the number of items we have to display can be larger
  // (or even smaller) than the number of incidents.
  const itemsInColumn = CategoryComputations.itemsInColumn(filteredData, categories, columnName)

  const heightPerItem = availableColumnHeight / itemsInColumn

  const displayedCategories = CategoryComputations.displayedCategories(data, columns, categories, columnName)

  return displayedCategories.map( (present, categoryName) => {
    if (relatedHiddenCategories.get(categoryName) === true) {
      // This item is a related hidden category, so it gets a fixed height
      return Constants.get('emptyCategoryHeight')
    }
    else {
      const items = CategoryComputations.itemsInCategory(filteredData, columnName, categoryName)
      return items * heightPerItem
    }
  })
    .filter( (height) => height > 0)

}

// Returns the height that each empty category should have.

WorkspaceComputations.emptyCategoryHeight = function(showEmptyCategories, viewport, data, columns, categories) {

  const columnHeight = WorkspaceComputations.columnHeight(viewport)

  const desiredEmptyCategoryHeight = CategoryComputations.desiredEmptyCategoryHeight(data, columns, categories)


  if (desiredEmptyCategoryHeight > columnHeight / 2) {
    const maxEmptyCategories = CategoryComputations.maxEmptyCategories(data, columns, categories)
    return (columnHeight / 2) / maxEmptyCategories
  }
  else {
    return Constants.get('emptyCategoryHeight')
  }

}



// Computes the height of the 'baseline', the line above which regular
// categories sit, and below which empty categories sit.

WorkspaceComputations.baselineHeight = function (showEmptyCategories, viewport, data, columns, categories) {

  // TODO: currently we're using the entire column height. we should actually 
  // be using the portion of the column height available to categories, less
  // the heading and drag handle, etc.
  const columnHeight = WorkspaceComputations.columnHeight(viewport)

  if (showEmptyCategories) {
    // When empty categories are shown, the baseline is determined by how many 
    // empty categories we have to show, up to a maximum of half of the 
    // workspace height
    const desiredEmptyCategoryHeight = CategoryComputations.desiredEmptyCategoryHeight(data, columns, categories)

    if (desiredEmptyCategoryHeight > columnHeight / 2) {
      return columnHeight / 2 + WorkspaceComputations.columnY()
    }
    else {
      return WorkspaceComputations.columnY() + columnHeight - desiredEmptyCategoryHeight
    }

  }
  else {
    // When empty categories are not shown, the baseline lies next to the bottom
    // margin of the workspace and no space is set aside for empty categories.
    return WorkspaceComputations.columnY() + columnHeight
  }

}



// The full amount of column space set aside for normal categories

WorkspaceComputations.columnNormalCategoryHeight = function (showEmptyCategories, viewport, data, columns, categories) {

  // TODO: currently, we're just using the top bar height, but this should
  // possibly account for the height of the heading? 
  return WorkspaceComputations.baselineHeight(showEmptyCategories, viewport, data, columns, categories) - WorkspaceComputations.columnY()

}

// The full amount of column space set aside for empty categories

WorkspaceComputations.columnEmptyCategoryHeight = function (showEmptyCategories, viewport, data, columns, categories) {

  // TODO: currently, we're using the bottom margin, but this doesn't take into
  // account the bottom drag handle
  return WorkspaceComputations.baselineHeight(showEmptyCategories, viewport, data, columns, categories) - Constants.get('bottomOuterMargin')

}


// The width and height of the map column
// These measurements are the outer dimensions of the map container, the map
// itself is drawn within padding inside of these measurements, and is
// scaled and centred to take maximum space without exceeding its bounds.
WorkspaceComputations.mapDimensions = function(showEmptyCategories, viewport, data, columns, categories) {

  const height = WorkspaceComputations.columnNormalCategoryHeight(
    showEmptyCategories,
    viewport,
    data,
    columns,
    categories)

  // TODO: The map seems way too big!

  return Immutable.Map({
    width: height * Constants.getIn(['map', 'widthHeightRatio']),
    height: height,
  })

}

// Should the named column render its connected paths? 
WorkspaceComputations.shouldRenderColumnPath = function (columns, columnName) {
  // If the column to our right is the map column, we don't render our paths
  const index = columns.indexOf(columnName)
  return columns.get(index + 1) !== 'map'
}



// Returns an immutable hash with positions and sizing information for most 
// elements which are laid out left to right. Keys include: 
//   pinColumn
//   columns
//   columnPaths
//   sideBar
//   socialBar
//   workspace - with width and height for the entire workspace


WorkspaceComputations.horizontalPositions = function(showEmptyCategories, viewport, data, columns, categories) {
  if (WorkspaceComputations.useScrollingWorkspace(columns)) {
    return WorkspaceComputations.horizontalPositionsWithScroll(showEmptyCategories, viewport, data, columns, categories)
  }
  else {
    return WorkspaceComputations.horizontalPositionsFixedWidth(viewport, columns)
  }
}

WorkspaceComputations.mapDragWidth = function(viewport) {
  const height = viewport.get('y') - 
                 WorkspaceComputations.topBarHeight() - 
                 Constants.get('bottomOuterMargin') -
                 Constants.get('columnHeadingHeight')
  return height * Constants.getIn(['map', 'widthHeightRatio'])
}

WorkspaceComputations.stepWidth = function(columns, viewport) {
  if (WorkspaceComputations.useScrollingWorkspace(columns)) {
    return WorkspaceComputations.stepWidthWithScroll()
  }
  else {
    return WorkspaceComputations.stepWidthFixedWidth(columns, viewport)
  }
}

WorkspaceComputations.stepWidthFixedWidth = function(columns, viewport) {
  const workspaceWidth = viewport.get('x')

  // Sum up how much space is available for the columns and paths.
  let remainingSpace = workspaceWidth
  remainingSpace -= Constants.getIn(['pinColumn', 'width']) + Constants.getIn(['pinColumn', 'horizontalMargins']) * 2
  remainingSpace -= Constants.getIn(['socialBar', 'width']) + Constants.getIn(['socialBar', 'leftMargin'])
  remainingSpace -= WorkspaceComputations.sidebarWidth(columns)

  // TODO: at this time, the map column never appears in fixed display mode
  // This math will need to be tweaked if we do permit it in.
  const ordinaryColumnsCount = WorkspaceComputations.ordinaryColumnsCount(columns)
  const widthPerOrdinaryColumnAndPath = remainingSpace / ordinaryColumnsCount
  const widthPerColumn = Constants.get('columnWideWidth')
  const widthPerColumnPath = widthPerOrdinaryColumnAndPath - widthPerColumn

  return widthPerColumn + widthPerColumnPath
}

WorkspaceComputations.stepWidthWithScroll = function() {
  // Columns + Column Paths
  const widthPerColumn = Constants.get('columnNarrowWidth')
  const minimumColumnPathWidth = Constants.get('minimumColumnPathWidth')

  return widthPerColumn + minimumColumnPathWidth
}


WorkspaceComputations.horizontalPositionsWithScroll = function(showEmptyCategories, viewport, data, columns, categories) {

  const columnHeight = WorkspaceComputations.columnHeight(viewport)
  const topBarHeight = WorkspaceComputations.columnY()

  // Move through each element left to right

  let measurements = Immutable.Map()
  let cumulativeX = 0

  // Pin column
  measurements = measurements.set('pinColumn', Immutable.fromJS({
    width: Constants.getIn(['pinColumn', 'width']) + Constants.getIn(['pinColumn', 'horizontalMargins']) * 2,
    innerWidth: Constants.getIn(['pinColumn', 'width']),
    height: columnHeight,
    x: Constants.getIn(['pinColumn', 'horizontalMargins']),
    y: topBarHeight,
  }))

  cumulativeX += measurements.getIn(['pinColumn', 'width'])



  // Columns + Column Paths
  const widthPerColumn = Constants.get('columnNarrowWidth')
  const minimumColumnPathWidth = Constants.get('minimumColumnPathWidth')

  measurements = measurements.set('columns', Immutable.Map())
  measurements = measurements.set('columnPaths', Immutable.Map())

  columns.forEach( columnName => {

    if(columnName === 'map') {

      const mapDimensions = WorkspaceComputations.mapDimensions(showEmptyCategories, viewport, data, columns, categories)

      measurements = measurements.setIn(['columns', columnName], Immutable.fromJS({
        width: mapDimensions.get('width'),
        height: mapDimensions.get('height'),
        x: cumulativeX,
        y: topBarHeight,
      }))

      cumulativeX += measurements.getIn(['columns', columnName, 'width'])
    }
    else {
      // All other columns except the map

      measurements = measurements.setIn(['columns', columnName], Immutable.fromJS({
        width: widthPerColumn,
        height: columnHeight,
        x: cumulativeX,
        y: topBarHeight,
      }))

      cumulativeX += measurements.getIn(['columns', columnName, 'width'])

      // If the column to our right is the map column, we don't render our paths
      if(!WorkspaceComputations.shouldRenderColumnPath(columns, columnName)) {
        return
      }

      measurements = measurements.setIn(['columnPaths', columnName], Immutable.fromJS({
        width: minimumColumnPathWidth,
        height: columnHeight,
        x: cumulativeX,
        y: topBarHeight,
      }))

      cumulativeX += measurements.getIn(['columnPaths', columnName, 'width'])
    }

  })



  // Sidebar
  measurements = measurements.set('sideBar', Immutable.fromJS({
    width: WorkspaceComputations.sidebarWidth(columns),
    height: columnHeight,
    x: cumulativeX,
    y: topBarHeight,
  }))
  cumulativeX += measurements.getIn(['sideBar', 'width'])


  // Social Bar
  measurements = measurements.set('socialBar', Immutable.fromJS({
    width: Constants.getIn(['socialBar', 'width']) + Constants.getIn(['socialBar', 'leftMargin']),
    innerWidth: Constants.getIn(['socialBar', 'width']),
    height: Constants.getIn(['socialBar', 'height']),
    x: cumulativeX,
    y: topBarHeight,
  }))
  cumulativeX += measurements.getIn(['socialBar', 'width'])



  // Workspace
  measurements = measurements.set('workspace', Immutable.fromJS({
    width: cumulativeX,
    height: viewport.get('y'),
  }))


  return measurements
}


// When the workspace width is fixed to the size of the viewport, the strategy
// for laying out elements is different. 
WorkspaceComputations.horizontalPositionsFixedWidth = function(viewport, columns) {

  const workspaceWidth = viewport.get('x')
  const columnHeight = WorkspaceComputations.columnHeight(viewport)
  const topBarHeight = WorkspaceComputations.columnY()

  let measurements = Immutable.Map()


  // First, address the elements with fixed widths surrounding the columns
  // in the middle: pin column, sidebar, social bar

  // Pin column
  measurements = measurements.set('pinColumn', Immutable.fromJS({
    width: Constants.getIn(['pinColumn', 'width']) + Constants.getIn(['pinColumn', 'horizontalMargins']) * 2,
    innerWidth: Constants.getIn(['pinColumn', 'width']),
    height: columnHeight,
    x: Constants.getIn(['pinColumn', 'horizontalMargins']),
    y: topBarHeight,
  }))

  // Social bar
  measurements = measurements.set('socialBar', Immutable.fromJS({
    width: Constants.getIn(['socialBar', 'width']) + Constants.getIn(['socialBar', 'leftMargin']),
    innerWidth: Constants.getIn(['socialBar', 'width']),
    height: Constants.getIn(['socialBar', 'height']),
    x: workspaceWidth - Constants.getIn(['socialBar', 'width']) - Constants.getIn(['socialBar', 'leftMargin']),
    y: topBarHeight,
  }))

  // Sidebar
  measurements = measurements.set('sideBar', Immutable.fromJS({
    width: WorkspaceComputations.sidebarWidth(columns),
    height: columnHeight,
    y: topBarHeight,
  }))
  measurements = measurements.setIn(['sideBar', 'x'],
    workspaceWidth
    - measurements.getIn(['socialBar', 'width'])
    - measurements.getIn(['sideBar', 'width'])
  )


  // Sum up how much space is available for the columns and paths.
  let remainingSpace = workspaceWidth
  remainingSpace -= measurements.getIn(['pinColumn', 'width'])
  remainingSpace -= measurements.getIn(['socialBar', 'width'])
  remainingSpace -= measurements.getIn(['sideBar', 'width'])



  // TODO: at this time, the map column never appears in fixed display mode
  // This math will need to be tweaked if we do permit it in.

  const ordinaryColumnsCount = WorkspaceComputations.ordinaryColumnsCount(columns)
  const widthPerOrdinaryColumnAndPath = remainingSpace / ordinaryColumnsCount
  const widthPerColumn = Constants.get('columnWideWidth')
  const widthPerColumnPath = widthPerOrdinaryColumnAndPath - widthPerColumn

  measurements = measurements.set('columns', Immutable.Map())
  measurements = measurements.set('columnPaths', Immutable.Map())

  let cumulativeX = measurements.getIn(['pinColumn', 'width'])

  // Columns + Column paths
  columns.forEach( columnName => {

    measurements = measurements.setIn(['columns', columnName], Immutable.fromJS({
      width: widthPerColumn,
      height: columnHeight,
      x: cumulativeX,
      y: topBarHeight,
    }))
    cumulativeX += widthPerColumn

    measurements = measurements.setIn(['columnPaths', columnName], Immutable.fromJS({
      width: widthPerColumnPath,
      height: columnHeight,
      x: cumulativeX,
      y: topBarHeight,
    }))

    cumulativeX += widthPerColumnPath

  })


  // Workspace
  measurements = measurements.set('workspace', Immutable.fromJS({
    width: workspaceWidth,
    height: viewport.get('y'),
  }))

  return measurements
}

// Returns an immutable list of the columns in the sidebar.
WorkspaceComputations.sidebarColumns = function(columns) {
  return Constants.get('columnNames').filter(
    (columnName) => columns.indexOf(columnName) < 0 )
}

// Returns the number of columns in the sidebar.
WorkspaceComputations.numberOfColumnsInSidebar = function(columns) {
  return Constants.get('columnNames').count() - columns.count()
}


// Height of the rightmost sidebar column
WorkspaceComputations.rightSidebarColumnHeight = function (sidebarHeight, columns) {
    
  // Sidebar Column Height = Height of Sidebar - 
  //                         ((Columns in Sidebar - 1) * Sidebar Stacking Offset)

  return sidebarHeight - ((WorkspaceComputations.numberOfColumnsInSidebar(columns) - 1) * Constants.getIn(['sidebar', 'verticalStackingOffset']))

}



const MemoizedComputations = {}

for (const name of Object.keys(WorkspaceComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(WorkspaceComputations[name])
}

window.wc = MemoizedComputations
module.exports = MemoizedComputations
