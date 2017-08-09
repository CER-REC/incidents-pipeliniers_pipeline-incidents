const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const Constants = require('../Constants.js')
// require('./ColumnPaths.scss')

class ColumnPaths extends React.Component {

  render() {
    return <g>
      <rect
        x={ WorkspaceComputations.columnPathX(this.props.columns, this.props.viewport, this.props.index) }
        y={ WorkspaceComputations.topBarHeight() + Constants.get('columnHeadingHeight')}
        width={ WorkspaceComputations.columnPathWidth(this.props.columns, this.props.viewport) }
        height={ WorkspaceComputations.columnHeight(this.props.viewport) - Constants.get('columnHeadingHeight')}
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