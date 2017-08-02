
const React = require('react')

const Workspace = require('./Workspace')

class Root extends React.Component {
  render() {
    return <div>
      <Workspace/>
    </div>

  }
}

module.exports = Root