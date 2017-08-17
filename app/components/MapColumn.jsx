const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')

// NB: The 'map column' is not responsible for actually drawing the map. It is
// just a dummy object to occupy the same space as the actual map canvas.

// As the map is drawn with a canvas element, embedding it in the SVG would be
// a bad idea. See MapContainer and Map components.

class MapColumn extends React.Component {

  render() {

    const measurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', 'map'])

    return <g>
      <rect
        x={ measurements.get('x') }
        y={ measurements.get('y') }
        width={ measurements.get('width') }
        height={ measurements.get('height') }
        fill='#fff'
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