const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const MapRenderer = require('../MapRenderer.js')

class Map extends React.Component {

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

    const element = <div> 
      <canvas 
        id="mapCanvas"
        width={mapDimensions.get('width')} 
        height={mapDimensions.get('height')}
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
    pinnedIncidents: state.pinnedIncidents, 
    filterboxActivationState: state.filterboxActivationState,
    categoryHoverState: state.categoryHoverState,
    hoveredIncident: state.hoveredIncident,
    schema: state.schema,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Map)