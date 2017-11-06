
const React = require('react')

const Workspace = require('./Workspace')

require('../styles/Fonts.scss')
require('../styles/Common.scss')
require('../styles/QuestionMarkIcon.scss')

class Root extends React.Component {
  render() {
    return <div>
      <Workspace/>
    </div>

  }
}

module.exports = Root