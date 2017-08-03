const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')

require('./Sidebar.scss')

class Sidebar extends React.Component {

  render() {
    // TODO: should this be a computation? getting complex
    const x = this.props.viewport.get('x') 
      - Constants.getIn(['socialBar', 'width'])
      - Constants.getIn(['socialBar', 'leftMargin'])
      - WorkspaceComputations.sidebarWidth(this.props.columns)

    return <g>
      <rect
        x={ x }
        y={ WorkspaceComputations.topBarHeight() }
        width={ WorkspaceComputations.sidebarWidth(this.props.columns) }
        height={ WorkspaceComputations.columnHeight(this.props.viewport) }
        fill='#DDDDFF'
      />
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Sidebar)