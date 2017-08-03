const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')

// require('./ColumnPaths.scss')

class ColumnPaths extends React.Component {

  render() {
    return <g>
      <rect
        x={ WorkspaceComputations.columnPathX(this.props.columns, this.props.viewport, this.props.index) }
        y={ WorkspaceComputations.topBarHeight() }
        width={ WorkspaceComputations.columnPathWidth(this.props.columns, this.props.viewport) }
        height={ WorkspaceComputations.columnHeight(this.props.viewport) }
        fill='#FFFFDD'
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


module.exports = ReactRedux.connect(mapStateToProps)(ColumnPaths)