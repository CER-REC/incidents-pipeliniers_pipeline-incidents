

const React = require('react')
const ReactDOM = require('react-dom')
const DomReady = require('domready')

const Root = require('./components/Root.jsx')






DomReady( () => {

  ReactDOM.render(<Root/>, document.getElementById('reactRoot'));
  
})

