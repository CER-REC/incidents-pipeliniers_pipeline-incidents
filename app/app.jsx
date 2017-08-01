const React = require('react')
const ReactDOM = require('react-dom')
const DomReady = require('domready')
const Redux = require('redux')
const ReactRedux = require('react-redux')

const Root = require('./components/Root.jsx')
const Resized = require('./actionCreators/ScreenResized')
const store = require('./Store')()

window.store = store
window.resized = Resized


DomReady( () => {
  const app = <ReactRedux.Provider store={store}>
    <Root />
  </ReactRedux.Provider>

  ReactDOM.render(app, document.getElementById('reactRoot'));
})

