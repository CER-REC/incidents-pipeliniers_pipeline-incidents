const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const MapComputations = require('../MapComputations.js')
const MapRenderer = require('../MapRenderer.js')
const ResizeInputCanvasCreator = require('../actionCreators/ResizeInputCanvasCreator.js')

class Map extends React.Component {

  canvasClick(event) {

    // Can't believe this stuff is still necessary to get the coordinate of a
    // click on a canvas ... 
    const canvas = document.getElementById('mapCanvas')
    const bounds = canvas.getBoundingClientRect()
    const x = event.pageX - bounds.left
    const y = event.pageY - bounds.top

    const colourData = this.props.canvasInputBuffer
      .getContext('2d')
      .getImageData(x, y, 1, 1)

    const str = `rgb(${colourData.data[0]}, ${colourData.data[1]}, ${colourData.data[2]})`

    const colourToIncidentNumberMap = MapComputations.canvasInputColourMap(
      this.props.data)
      .get('colourToIncidentNumberMap')

    console.log(colourToIncidentNumberMap.get(str))

  }

  componentDidMount() {
    this.renderCanvas()
  }

  componentDidUpdate() {
    this.renderCanvas()
  }

  renderCanvas() {
    const canvas = document.getElementById('mapCanvas')

    // Passing the entire props object is convenient, but possibly a bad idea?
    MapRenderer(canvas, this.props)
  }

  render() {
    
    const mapDimensions = WorkspaceComputations.mapDimensions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)

    // TODO: this isn't awesome and is possibly a problem ... 
    this.props.dispatch(ResizeInputCanvasCreator(
      mapDimensions.get('width'), 
      mapDimensions.get('height')
    ))

    const element = <div> 
      <canvas 
        id="mapCanvas"
        width={mapDimensions.get('width')} 
        height={mapDimensions.get('height')} 
        onClick={ event => this.canvasClick(event) }
      />
    </div>

    // NB: We can't call renderCanvas in render itself.
    // On first render, the canvas element doesn't exist in the dom yet.
    // On subsequent renders, if the canvas dimensions change, the canvas
    // contents are erased. The canvas dimension changes will occur after the
    // render call has completed.

    return element
  }

}




const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
    canvasInputBuffer: state.canvasInputBuffer
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Map)