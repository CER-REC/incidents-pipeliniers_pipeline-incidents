const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')

// require('./ColumnPaths.scss')

class ColumnPaths extends React.Component {



  render() {
    const width = WorkspaceComputations.columnPathWidth(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)


    const x = WorkspaceComputations.columnPathXCoordinates(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories).get(this.props.columnName)

    return <g>
      <rect
        x={ x }
        y={ WorkspaceComputations.topBarHeight() }
        width={ width }
        height={ WorkspaceComputations.columnHeight(this.props.viewport) }
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