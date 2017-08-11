const MemoizeImmutable = require('memoize-immutable')
const Immutable = require('immutable')

const Constants = require('./Constants.js')
const CategoryComputations = require('./CategoryComputations.js')

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
  return viewport.get('y') 
    - WorkspaceComputations.topBarHeight()
    - Constants.get('bottomOuterMargin')
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


// // The leftmost part of the SVG where columns begin
// WorkspaceComputations.columnsLeftBounds = function () {
//   return Constants.getIn(['pinColumn', 'horizontalMargins']) * 2
//     + Constants.getIn(['pinColumn', 'width'])
// }

// // The rightmost part of the SVG, where the columns end.
// // Sidebar space is further right in the SVG. 
// WorkspaceComputations.columnsRightBounds = function (showEmptyCategories, viewport, data, columns, categories) {
//   return WorkspaceComputations.sidebarX(showEmptyCategories, viewport, data, columns, categories)
// }

// The total amount of width available for ordinary columns, with the space
// needed for the map column subtracted if it is present
// WorkspaceComputations.ordinaryColumnAvailableWidth = function (showEmptyCategories, viewport, data, columns, categories) {
  
//   // Define the left and right bounds of where we will be drawing columns and
//   // paths.
//   const leftBounds = WorkspaceComputations.columnsLeftBounds()
//   const rightBounds = WorkspaceComputations.columnsRightBounds(showEmptyCategories, viewport, data, columns, categories) 

//   let availableSpace = rightBounds - leftBounds
//   if (WorkspaceComputations.mapDisplayed(columns)) {
//     availableSpace -= WorkspaceComputations.mapDimensions(showEmptyCategories, viewport, data, columns, categories).get('width')
//   }
//   return availableSpace
// }



// The amount of width each ordinary column has for rendering
// WorkspaceComputations.widthPerOrdinaryColumn = function (showEmptyCategories, viewport, data, columns, categories) {

//   const availableSpace = WorkspaceComputations.ordinaryColumnAvailableWidth(showEmptyCategories, viewport, data, columns, categories)

//   const ordinaryColumnsCount = WorkspaceComputations.ordinaryColumnsCount(columns)
//   const widthPerOrdinaryColumn = availableSpace / ordinaryColumnsCount

//   return widthPerOrdinaryColumn
// }


// A hash of {columnName: xCoordinate}, the coordinate used for positioning the
// column horizontally
WorkspaceComputations.columnXCoordinates = function (showEmptyCategories, viewport, data, columns, categories) {

  const widthPerOrdinaryColumn = WorkspaceComputations.widthPerOrdinaryColumn(showEmptyCategories, viewport, data, columns, categories)

  let columnXCoordinates = Immutable.Map()
  let cumulativeXCoordinate = WorkspaceComputations.columnsLeftBounds()

  columns.forEach( columnName => {
    if (columnName === 'map') {

      let columnX = cumulativeXCoordinate

      // For the column to the left of the map, we do not render the usual paths
      // to the right of that column. The map is positioned adjacent to the
      // column to its left to compensate.
      // We only do this if there is a column left of the map
      if (columns.get(0) !== 'map') {
        const columnPathWidth = WorkspaceComputations.columnPathWidth(showEmptyCategories, viewport, data, columns, categories)
        columnX -= columnPathWidth
        cumulativeXCoordinate -= columnPathWidth
      }

      columnXCoordinates = columnXCoordinates.set('map', columnX)
      cumulativeXCoordinate += WorkspaceComputations.mapDimensions(showEmptyCategories, viewport, data, columns, categories).get('width')
    }
    else {
      columnXCoordinates = columnXCoordinates.set(columnName, cumulativeXCoordinate)
      cumulativeXCoordinate += widthPerOrdinaryColumn
    }
  })

  return columnXCoordinates
}


// columns: the columns state
// viewport: the viewport state
WorkspaceComputations.columnPathWidth = function (showEmptyCategories, viewport, data, columns, categories) {

  if (WorkspaceComputations.useScrollingWorkspace(columns)) {
    return Constants.get('minimumColumnPathWidth')
  }
  else {
    const widthPerOrdinaryColumn = WorkspaceComputations.widthPerOrdinaryColumn(showEmptyCategories, viewport, data, columns, categories)

    const columnWidth = WorkspaceComputations.columnWidth(columns)

    return widthPerOrdinaryColumn - columnWidth
  }
}


// A hash of {columnName: xCoordinate}, the coordinate used for positioning the
// column path horizontally
WorkspaceComputations.columnPathXCoordinates = function (showEmptyCategories, viewport, data, columns, categories) {
  return WorkspaceComputations.columnXCoordinates(showEmptyCategories, viewport, data, columns, categories)
    .map( xCoordinate => {
      return xCoordinate + WorkspaceComputations.columnWidth(columns)
    })
}

// columns: the columns state
WorkspaceComputations.sidebarWidth = function (columns) {
  let width = Constants.getIn(['sidebar', 'columWidth'])
  const columnCount = (Constants.get('columnNames').count() - columns.count() - 1)
  width += Constants.getIn(['sidebar', 'columnOffset']) * columnCount
  return width
}


// WorkspaceComputations.sidebarX = function (showEmptyCategories, viewport, data, columns, categories) {
//   return WorkspaceComputations.workspaceWidth(showEmptyCategories, viewport, data, columns, categories)
//     - Constants.getIn(['socialBar', 'width'])
//     - Constants.getIn(['socialBar', 'leftMargin'])
//     - WorkspaceComputations.sidebarWidth(columns)
// }



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


// Should we use math that can produce a horizontally scrolling workspace, or 
// not?
WorkspaceComputations.useScrollingWorkspace = function (columns) {
  const ordinaryColumnsCount = WorkspaceComputations.ordinaryColumnsCount(columns)
  const maxColumnsWithoutScroll = WorkspaceComputations.maxColumnsWithoutScroll(columns)

  return ordinaryColumnsCount > maxColumnsWithoutScroll
}


// columns: the columns state
// viewport: the viewport state
WorkspaceComputations.workspaceWidth = function (showEmptyCategories, viewport, data, columns, categories) {

  const ordinaryColumnsCount = WorkspaceComputations.ordinaryColumnsCount(columns)
  const useScrollingWorkspace = WorkspaceComputations.useScrollingWorkspace(columns)

  if (useScrollingWorkspace) {
    let width = Constants.getIn(['pinColumn', 'horizontalMargins']) * 2
    width += Constants.getIn(['pinColumn', 'width'])

    width += (Constants.get('columnNarrowWidth') + Constants.get('minimumColumnPathWidth')) 
      * ordinaryColumnsCount

    if (WorkspaceComputations.mapDisplayed(columns)) {
      width += WorkspaceComputations.mapDimensions(showEmptyCategories, viewport, data, columns, categories).get('width')
    }

    // TODO: This is a giant hack. We could use a saner way to calculate the
    // column x coordinates
    // If the map is not the first column, then the path for the column to its
    // left is not rendered, subtract that width from the available page space
    if (WorkspaceComputations.mapDisplayed(columns) && columns.get(0) !== 'map') {
      width -= WorkspaceComputations.columnPathWidth(showEmptyCategories, viewport, data, columns, categories)
    }

    width += WorkspaceComputations.sidebarWidth(columns)

    width += Constants.getIn(['socialBar', 'width'])
    width += Constants.getIn(['socialBar', 'leftMargin'])

    return width
  }
  else {
    return viewport.get('x')
  }

}


// Returns an immutable map of category names to category heights, for the given
// column name.
// viewport: the viewport state
// data: the data state
// categories: the category display state
WorkspaceComputations.categoryHeights = function (showEmptyCategories, viewport, data, columns, categories, columnName) {

  // TODO: for now, we use the entire column height.
  // Other column elements (and empty categories) will eventually need to cut
  // into this height
  const columnHeight = WorkspaceComputations.columnNormalCategoryHeight(showEmptyCategories, viewport, data, columns, categories)

  const relatedHiddenCategories = CategoryComputations.relatedHiddenCategories(data, columns, categories, columnName)

  // TODO: currently, we place no limits on the space the related hidden
  // categories can take up. I suspect this number will always be small, but if
  // it turns out to be large, we may need to cap it.
  const relatedHiddenCategoryHeight = relatedHiddenCategories.count() * Constants.get('emptyCategoryHeight')

  const availableColumnHeight = columnHeight - relatedHiddenCategoryHeight

  // Due to multiple selection categories (where an incident can appear in
  // multiple categories) the number of items we have to display can be larger
  // (or even smaller) than the number of incidents.
  const itemsInColumn = CategoryComputations.itemsInColumn(data, categories, columnName)

  const heightPerItem = availableColumnHeight / itemsInColumn

  const displayedCategories = CategoryComputations.displayedCategories(data, columns, categories, columnName)

  return displayedCategories.map( (present, categoryName) => {
    if (relatedHiddenCategories.get(categoryName) === true) {
      // This item is a related hidden category, so it gets a fixed height
      return Constants.get('emptyCategoryHeight')
    }
    else {
      const items = CategoryComputations.itemsInCategory(data, columnName, categoryName)
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
      return columnHeight / 2 + WorkspaceComputations.topBarHeight()
    }
    else {
      return WorkspaceComputations.topBarHeight() + columnHeight - desiredEmptyCategoryHeight
    }

  }
  else {
    // When empty categories are not shown, the baseline lies next to the bottom
    // margin of the workspace and no space is set aside for empty categories.
    return WorkspaceComputations.topBarHeight() + columnHeight
  }

}



// The full amount of column space set aside for normal categories

WorkspaceComputations.columnNormalCategoryHeight = function (showEmptyCategories, viewport, data, columns, categories) {

  // TODO: currently, we're just using the top bar height, but this should
  // possibly account for the height of the heading? 
  return WorkspaceComputations.baselineHeight(showEmptyCategories, viewport, data, columns, categories) - WorkspaceComputations.topBarHeight()

}

// The full amount of column space set aside for empty categories

WorkspaceComputations.columnEmptyCategoryHeight = function (showEmptyCategories, viewport, data, columns, categories) {

  // TODO: currently, we're using the bottom margin, but this doesn't take into
  // account the bottom drag handle
  return WorkspaceComputations.baselineHeight(showEmptyCategories, viewport, data, columns, categories) - Constants.get('bottomOuterMargin')

}


// The width and height of the map column
WorkspaceComputations.mapDimensions = function(showEmptyCategories, viewport, data, columns, categories) {

  const height = WorkspaceComputations.columnNormalCategoryHeight(
    showEmptyCategories,
    viewport,
    data,
    columns,
    categories)

  // TODO: The map seems way too big!

  return Immutable.Map({
    width: height * Constants.get('mapWidthHeightRatio'),
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
// elements which are laid out left to right.

/*
TODO: include
  pin column
  columns
  column paths
  sibedar
  social bar
  workspace
*/


WorkspaceComputations.horizontalPositions = function(showEmptyCategories, viewport, data, columns, categories) {

  if (WorkspaceComputations.useScrollingWorkspace(columns)) {
    return WorkspaceComputations.horizontalPositionsWithScroll(showEmptyCategories, viewport, data, columns, categories)
  }
  else {
    return WorkspaceComputations.horizontalPositionsFixedWidth(showEmptyCategories, viewport, data, columns, categories)

  }

}









const MemoizedComputations = {}

for (const name of Object.keys(WorkspaceComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(WorkspaceComputations[name])
}

window.wc = MemoizedComputations
module.exports = MemoizedComputations
