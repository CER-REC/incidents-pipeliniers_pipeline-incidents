const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')

require('./Sidebar.scss')

class Sidebar extends React.Component {

  // TODO: we should think about sidebar rendering in two special cases:
  // - when the sidebar is empty, do we show something to indicate where it is?
  // - when the user is dragging a column around, should we show something on
  //   the sidebar to indicate that it is a drop target?

  render() {
    return <g>
      <rect
        x={ WorkspaceComputations.sidebarX(this.props.columns, this.props.viewport) }
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