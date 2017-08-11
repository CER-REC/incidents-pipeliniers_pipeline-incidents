const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')

class MapColumn extends React.Component {

  render() {

    const x = WorkspaceComputations.columnXCoordinates(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories).get('map')

    const dimensions = WorkspaceComputations.mapDimensions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)


    return <g>
      <rect
        x={ x }
        y={ WorkspaceComputations.topBarHeight() }
        width={ dimensions.get('width') }
        height={ dimensions.get('height') }
        fill='#888'
      />
    </g>
  }
}




const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
    categories: state.categories,
    data: state.data,
    showEmptyCategories: state.showEmptyCategories,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(MapColumn)