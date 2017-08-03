const Constants = require('./Constants.js')


const WorkspaceComputations = {}


/*
height
  -column height, sensitive to viewport height
  
width
  -column width. sensitive to number of columns
  -column + path width, sensitive to 

  -workspace width, sensitive to number of columns

  -sidebar width, sensitive to number of sidebar columns
*/

// TODO: is this necessary?
// columns: the columns state
WorkspaceComputations.mapDisplayed = function(columns) {
  // TODO: should the 'map' string and others like it be constants somehow?
  return columns.contains('map')
}


// TODO: should I be put in the constants file? memoize the computation?
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
  return viewport.get('y') - WorkspaceComputations.topBarHeight() - Constants.get('bottomOuterMargin')
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

WorkspaceComputations.columnX = function(columns, viewport, i) {

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
  return viewport.get('x')
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


module.exports = WorkspaceComputations
