const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')

require('./IncidentBar.scss')

class IncidentBar extends React.Component {

  render() {
    return <g>
      <rect
        x={ Constants.getIn(['pinColumn', 'horizontalMargins']) }
        y={ WorkspaceComputations.topBarHeight() }
        width={ Constants.getIn(['pinColumn', 'width']) }
        height={ WorkspaceComputations.columnHeight(this.props.viewport) }
        fill='#DDFFDD'
      />
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(IncidentBar)