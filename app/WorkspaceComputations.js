const MemoizeImmutable = require('memoize-immutable')

const Constants = require('./Constants.js')
const CategoryComputations = require('./CategoryComputations.js')

const WorkspaceComputations = {}




// TODO: is this necessary?
// columns: the columns state
WorkspaceComputations.mapDisplayed = function(columns) {
  // TODO: should the 'map' string and others like it be constants somehow?
  return columns.contains('map')
}


// NB: Thanks to memoize-immutable, this function is effectively always memoized
WorkspaceComputations.topBarHeight = function () {
  let height = Constants.get('topOuterMargin')
  const lineHeight = Constants.getIn(['topBar', 'headingLineHeight'])

  height += Constants.getIn(['topBar', 'headingFontSize']) * lineHeight
  height += Constants.getIn(['topBar', 'subheadingFontSize']) * 2 * lineHeight
  height += Constants.getIn(['topBar', 'topBarBottomMargin'])

  return height
}

// viewport: the viewport state
WorkspaceComputations.columnHeight = function (viewport) {
  return viewport.get('y') - 
         WorkspaceComputations.topBarHeight() - 
         Constants.get('bottomOuterMargin') -
         Constants.get('columnHeadingHeight')
}


// columns: the columns state
WorkspaceComputations.columnWidth = function (columns) {
  // TODO: update me when we add the currently displayed columns to the store
  if (columns.count() > Constants.get('maxColumnsWithoutScroll')) {
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

WorkspaceComputations.columnX = function (columns, viewport, i) {

  // Define the left and right bounds of where we will be drawing columns and
  // paths.
  const leftBounds = Constants.getIn(['pinColumn', 'horizontalMargins']) * 2
    + Constants.getIn(['pinColumn', 'width'])
  const rightBounds = WorkspaceComputations.sidebarX(columns, viewport)

  // Divide the space up between the number of columns
  // TODO: this math will need to be altered if the map column is on display
  const spacePerColumn = (rightBounds - leftBounds) / columns.count()

  // Supply the coordinate for the current column
  return leftBounds + spacePerColumn * i
}

// columns: the columns state
// viewport: the viewport state
WorkspaceComputations.columnPathWidth = function (columns, viewport) {
  if (columns.count() > Constants.get('maxColumnsWithoutScroll')) {
    return Constants.get('minimumColumnPathWidth')
  }
  else {
    let availableWidth = WorkspaceComputations.workspaceWidth(columns, viewport)
    availableWidth -= Constants.getIn(['pinColumn', 'horizontalMargins']) * 2
    availableWidth -= Constants.getIn(['pinColumn', 'width'])
    availableWidth -= columns.count() * Constants.get('columnWideWidth')
    availableWidth -= Constants.getIn(['socialBar', 'width'])
    availableWidth -= WorkspaceComputations.sidebarWidth(columns)
    availableWidth -= Constants.getIn(['socialBar', 'leftMargin'])
    return availableWidth / columns.count()
  }
}

WorkspaceComputations.columnPathX = function (columns, viewport, i) {
  return WorkspaceComputations.columnX(columns, viewport, i) 
    + WorkspaceComputations.columnWidth(columns)
}

// columns: the columns state
WorkspaceComputations.sidebarWidth = function (columns) {
  let width = Constants.getIn(['sidebar', 'columWidth'])
  const columnCount = (Constants.get('columnNames').count() - columns.count() - 1)
  width += Constants.getIn(['sidebar', 'columnOffset']) * columnCount
  return width
}

WorkspaceComputations.sidebarX = function (columns, viewport) {
  return WorkspaceComputations.workspaceWidth(columns, viewport)
    - Constants.getIn(['socialBar', 'width'])
    - Constants.getIn(['socialBar', 'leftMargin'])
    - WorkspaceComputations.sidebarWidth(columns)
}

// columns: the columns state
// viewport: the viewport state
WorkspaceComputations.workspaceWidth = function (columns, viewport) {

  if (columns.count() > Constants.get('maxColumnsWithoutScroll')) {
    // right margin, social media bar width
    let width = Constants.getIn(['pinColumn', 'horizontalMargins']) * 2
    width += Constants.getIn(['pinColumn', 'width'])

    // TODO: verify that this works when we add columns reducer
    width += (Constants.get('columnNarrowWidth') + Constants.get('minimumColumnPathWidth')) * columns.count() 

    width += WorkspaceComputations.sidebarWidth(columns)

    width += Constants.getIn(['socialBar', 'width'])
    width += Constants.getIn(['socialBar', 'leftMargin'])

    return width
  }
  else {
    return viewport.get('x')
  }

}

WorkspaceComputations.dragArrowX = function (columns, viewport, index) {
  const columnX = WorkspaceComputations.columnX(columns, viewport, index)
  const columnWidth = WorkspaceComputations.columnWidth(columns)
  const dragArrowWidth = Constants.getIn(['dragArrow', 'width'])

  return columnX + columnWidth / 2 - dragArrowWidth / 2
}

WorkspaceComputations.dragArrowY = function (viewport) {
  return WorkspaceComputations.topBarHeight() + 
         Constants.get('columnSubheadingOffset') + 
         WorkspaceComputations.columnHeight(viewport) + 7
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




const MemoizedComputations = {}

for (const name of Object.keys(WorkspaceComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(WorkspaceComputations[name])
}

module.exports = MemoizedComputations
