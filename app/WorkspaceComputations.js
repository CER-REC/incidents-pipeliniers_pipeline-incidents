const Constants = require('./Constants.js')


const WorkspaceComputations = {}


/*
functions we'll need:


concerns
  -is the top bar height constant? maybe?
  -is the incident bar width constant? maybe?



height
  -column height, sensitive to viewport height
  
width
  -column width. sensitive to number of columns
  -column + path width, sensitive to 

  -workspace width, sensitive to number of columns

  -sidebar width, sensitive to number of sidebar columns

*/

WorkspaceComputations.mapDisplayed = function(store) {
  // TODO: should the 'map' string and others like it be constants somehow?
  return store.columns.contains('map')
}


// TODO: should I be put in the constants file? memoize the computation
WorkspaceComputations.topBarHeight = function () {
  let height = Constants.get('topOuterMargin')
  const lineHeight = Constants.getIn(['topBar', 'headingLineHeight'])

  height += Constants.getIn(['topBar', 'headingFontSize']) * lineHeight
  height += Constants.getIn(['topBar', 'subheadingFontSize']) * 2 * lineHeight
  height += Constants.getIn(['topBar', 'topBarBottomMargin'])

  return height
}

WorkspaceComputations.columnHeight = function (store) {
  return store.viewport.get('y') - WorkspaceComputations.topBarHeight() - Constants.get('bottomOuterMargin')
}


WorkspaceComputations.columnWidth = function (store) {
  // TODO: update me when we add the currently displayed columns to the store
  if (store.columns.count() > Constants.get('maxColumnsWithoutScroll')) {
    return Constants.get('columnNarrowWidth')
  }
  else {
    return Constants.get('columnWideWidth')
  }
}


WorkspaceComputations.columnPathWidth = function (store) {
  if (store.columns.count() > Constants.get('maxColumnsWithoutScroll')) {
    return Constants.get('minimumColumnPathWidth')
  }
  else {
    let availableWidth = WorkspaceComputations.workspaceWidth(store)

    availableWidth -= Constants.getIn(['pinColumn', 'horizontalMargins']) * 2
    availableWidth -= Constants.getIn(['pinColumn', 'width'])
    availableWidth -= store.columns.count() * Constants.get('columnWideWidth')
    availableWidth -= Constants.getIn(['socialBar', 'width'])
    availableWidth -= Constants.getIn(['socialBar', 'leftMargin'])
    return availableWidth / store.columns.count()
  }
}


WorkspaceComputations.sidebarWidth = function (store) {
  let width = Constants.getIn(['sidebar', 'columWidth'])
  const columnCount = (Constants.get('columnNames').count() - store.columns.count() - 1)
  width += Constants.getIn(['sidebar', 'columnOffset']) * columnCount
  return width
}


WorkspaceComputations.workspaceWidth = function (store) {

  if (store.columns.count() > Constants.get('maxColumnsWithoutScroll')) {
    // right margin, social media bar width
    let width = Constants.getIn(['pinColumn', 'horizontalMargins']) * 2
    width += Constants.getIn(['pinColumn', 'width'])

    // TODO: verify that this works when we add columns reducer
    width += (Constants.get('columnNarrowWidth') + Constants.get('minimumColumnPathWidth')) * store.columns.count() 

    width += WorkspaceComputations.sidebarWidth(store)

    width += Constants.getIn(['socialBar', 'width'])
    width += Constants.getIn(['socialBar', 'leftMargin'])

    return width
  }
  else {
    return store.viewport.get('x')
  }

}


module.exports = WorkspaceComputations
