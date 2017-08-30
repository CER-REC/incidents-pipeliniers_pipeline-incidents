const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')

require('./MapColumn.scss')

// NB: The 'map column' is not responsible for actually drawing the map. It is
// just a dummy object to occupy the same space as the actual map canvas.

// As the map is drawn with a canvas element, embedding it in the SVG would be
// a bad idea. See MapContainer and Map components.

class MapColumn extends React.Component {

  dragArrow() {
    const measurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', 'map'])

    const dragArrowX = measurements.get('x') + 
                       (measurements.get('width') / 2) - 
                       (Constants.getIn(['dragArrow', 'width']) / 2)

    return <image xlinkHref='images/horizontal_drag.svg' 
      className = 'dragArrow'
      height = {Constants.getIn(['dragArrow', 'height'])}
      width = {Constants.getIn(['dragArrow', 'width'])}
      x= {dragArrowX}
      y= {WorkspaceComputations.dragArrowY(this.props.viewport)}>
    </image>
  }

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
        opacity='0'
      />
      {this.dragArrow()}
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