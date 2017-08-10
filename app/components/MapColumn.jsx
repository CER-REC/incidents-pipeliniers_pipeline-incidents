const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')

class MapColumn extends React.Component {

  render() {
    return <g>
      <rect
        x={ WorkspaceComputations.columnX(this.props.columns, this.props.viewport, this.props.index) }
        y={ WorkspaceComputations.columnY() }
        width={ WorkspaceComputations.columnWidth(this.props.columns) }
        height={ WorkspaceComputations.columnHeight(this.props.viewport) }
        fill='#000'
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


module.exports = ReactRedux.connect(mapStateToProps)(MapColumn)