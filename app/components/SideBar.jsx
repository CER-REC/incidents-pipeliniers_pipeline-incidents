const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')

require('./Sidebar.scss')

class Sidebar extends React.Component {

  render() {
    return <g>
      <rect
        x={ WorkspaceComputations.sidebarX(this.props.columns, this.props.viewport) }
        y={ WorkspaceComputations.columnY() }
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