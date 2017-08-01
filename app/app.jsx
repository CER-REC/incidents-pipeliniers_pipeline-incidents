

const React = require('react')
const ReactDOM = require('react-dom')
const DomReady = require('domready')

const Root = require('./components/Root.jsx')





const ReactRedux = require('react-redux')
const Redux = require('redux')

const store = require('./Store')()
window.store = store



DomReady( () => {
  const app = <ReactRedux.Provider store={store}>
    <Root />
  </ReactRedux.Provider>

  ReactDOM.render(app, document.getElementById('reactRoot'));
})

