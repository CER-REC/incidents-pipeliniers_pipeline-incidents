const ReactDOM = require('react-dom')
const DomReady = require('domready')
const ReactRedux = require('react-redux')
const React = require('react')

const Constants = require('./Constants.js')
const Root = require('./components/Root.jsx')
const Resized = require('./actionCreators/ResizeScreenCreator.js')
const store = require('./Store.js')()

window.store = store
window.resized = Resized

DomReady( () => {

  resizeScreenHandler()
  window.addEventListener('resize', resizeScreenHandler)

  const app = <ReactRedux.Provider store={store}>
    <Root />
  </ReactRedux.Provider>

  ReactDOM.render(app, document.getElementById('reactRoot'))
})

function resizeScreenHandler()  
{
  // Ensures the width and height of the workspace keep the ratio 900:600
  // TODO: Increase the height of the workspace by emptyCategoryOffsetRatio if
  // the empty categories are visible (i.e. empty categories state is visible).
  const w = document.getElementById('reactRoot').clientWidth
  const h = w * Constants.getIn(['workspace', 'heightToWidthRatio'])
  store.dispatch(Resized(w,h))
}