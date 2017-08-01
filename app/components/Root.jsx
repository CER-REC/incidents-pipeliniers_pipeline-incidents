
const React = require('react')


const ComponentA = require('./ComponentA')
const ComponentB = require('./ComponentB')


class Root extends React.Component {
  render() {
    return <div>
      <ComponentA/>
      <ComponentB/>
    </div>

  }
}

module.exports = Root