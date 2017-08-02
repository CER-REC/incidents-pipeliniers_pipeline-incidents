const ReactDOM = require('react-dom')
const DomReady = require('domready')
const ReactRedux = require('react-redux')
const React = require('react')

const Root = require('./components/Root.jsx')
const Resized = require('./actionCreators/ResizeScreenCreator')
const store = require('./Store')()

window.store = store
window.resized = Resized

DomReady( () => {
  const app = <ReactRedux.Provider store={store}>
    <Root />
  </ReactRedux.Provider>

  ReactDOM.render(app, document.getElementById('reactRoot'))
})

