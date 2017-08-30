const ReactDOM = require('react-dom')
const DomReady = require('domready')
const ReactRedux = require('react-redux')
const React = require('react')

const Constants = require('./Constants.js')
const Root = require('./components/Root.jsx')
const Resized = require('./actionCreators/ResizeScreenCreator.js')
const DragColumn = require('./actionCreators/DragColumnCreator.js')
const DragColumnEnded = require('./actionCreators/DragColumnEndedCreator.js')
const store = require('./Store.js')()
const DataLoader = require('./DataLoader.js')

// Uncomment for debugging only.
window.store = store
window._ = require('lodash')

// TODO: is this the best place for this?
DataLoader.loadDataCsv(store)

DomReady( () => {

  resizeScreenHandler()
  window.addEventListener('resize', resizeScreenHandler)
  
  // These handlers will help keep the dragged column moving
  // even when the cursor is off the dragging handle. This
  // is necessary because the dragging handle is too small
  // making it harder to drag without the cursor leaving 
  // the handle.
  window.addEventListener('mouseup', mouseUpHandler)
  window.addEventListener('mousemove', mouseMoveHandler)

  const app = <ReactRedux.Provider store={store}>
    <Root />
  </ReactRedux.Provider>

  ReactDOM.render(app, document.getElementById('reactRoot'))
})

function mouseUpHandler(e)
{
  e.stopPropagation()
  e.preventDefault()
  store.dispatch(DragColumnEnded(false))
}

function mouseMoveHandler(e)
{
  e.stopPropagation()
  e.preventDefault()
  store.dispatch(DragColumn(e.clientX))
}

function resizeScreenHandler()  
{
  // Ensures the width and height of the workspace keep the ratio 900:600
  // TODO: Increase the height of the workspace by emptyCategoryOffsetRatio if
  // the empty categories are visible (i.e. empty categories state is visible).
  const w = document.getElementById('reactRoot').clientWidth
  const h = w * Constants.getIn(['workspace', 'heightToWidthRatio'])
  store.dispatch(Resized(w,h))
}