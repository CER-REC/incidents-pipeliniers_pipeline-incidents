const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')

// require('./ColumnPaths.scss')

class ColumnPaths extends React.Component {



  render() {

    const pathMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columnPaths', this.props.columnName])

    return <g>
      <rect
        x={ pathMeasurements.get('x') }
        y={ pathMeasurements.get('y') }
        width={ pathMeasurements.get('width') }
        height={ pathMeasurements.get('height') }
        fill='#FFFFDD'
      />
    </g>
  }
}

const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(ColumnPaths)