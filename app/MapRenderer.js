const d3geo = require('d3-geo')

const Constants = require('./Constants.js')
const MapComputations = require('./MapComputations.js')
const IncidentComputations = require('./IncidentComputations.js')
const WorkspaceComputations = require('./WorkspaceComputations.js')
const CategoryComputations = require('./CategoryComputations.js')

// NB: The configuration of the projection here *must* match the settings used
// to produce the canada.svg, or the incidents will not be positioned
// accurately!
const projection = d3geo.geoConicEqualArea()
  .parallels([50, 70])
  .rotate([105, 0])
  .translate([279.8074028618924, 764.3666957846632])
  .scale(874.913034725085)
window.projection = projection


const RenderRoutines = {

  clear(context, props) {

    const mapDimensions = WorkspaceComputations.mapDimensions(
      props.showEmptyCategories,
      props.viewport,
      props.data,
      props.columns,
      props.categories)

    context.fillStyle = Constants.getIn(['map', 'backgroundColour'])
    context.fillRect(
      0,
      0,
      mapDimensions.get('width'),
      mapDimensions.get('height')
    )

  },

  drawMap(context, props) {
    const basemapImage = document.getElementById('canadaImage')
    const padding = Constants.getIn(['map', 'padding'])

    const basemapPosition = MapComputations.basemapPosition(
      props.showEmptyCategories,
      props.viewport,
      props.data,
      props.columns,
      props.categories)

    // TODO:
    // I hope there are no race conditions associated with loading the
    // image. may need to manage that ourselves.
    context.drawImage(basemapImage, 
      basemapPosition.get('x') + padding,
      basemapPosition.get('y') + padding,
      basemapPosition.get('width'),
      basemapPosition.get('height')
    )
    
  },

  drawLines(context, props) {
    
    const mapAdjacentColumns = CategoryComputations.mapAdjacentColumns(
      props.columns)

    // get displayed categories
    // get items in categories

    // draw paths from left column to bundle point
    // draw paths from bundle point to incidents

    // draw paths from incident to right bundle point
    // draw paths from bundle point to right column

  },

  drawPoints(context, props) {

    const basemapPosition = MapComputations.basemapPosition(
      props.showEmptyCategories,
      props.viewport,
      props.data,
      props.columns,
      props.categories)

    const filteredData = IncidentComputations.filteredIncidents(
      this.props.data,
      this.props.columns,
      this.props.categories)

    const incidentColour = Constants.getIn(['map', 'incidentCircleColour'])
    const shadowColour = Constants.getIn(['map', 'shadowColour'])
    const padding = Constants.getIn(['map', 'padding'])

    const incidentRadius = Constants.getIn(['map', 'incidentRadius'])
    const xOffset = basemapPosition.get('x')
    const yOffset = basemapPosition.get('y')
    const ratio = basemapPosition.get('ratio')


    filteredData.forEach( incident => {

      const projectedPosition = projection([
        incident.get('longitude'),
        incident.get('latitude')
      ])


      // Drop shadow behind each incident
      context.fillStyle = shadowColour
      context.beginPath()
      // x, y, radius, start angle, end angle, anticlockwise
      context.arc(
        projectedPosition[0] * ratio + xOffset + 1 + padding,
        projectedPosition[1] * ratio + yOffset + 1 + padding,
        incidentRadius,
        0,
        2 * Math.PI
      )
      context.fill()


      // The incident itself
      context.fillStyle = incidentColour
      context.beginPath()
      // x, y, radius, start angle, end angle, anticlockwise
      context.arc(
        projectedPosition[0] * ratio + xOffset + padding,
        projectedPosition[1] * ratio + yOffset + padding,
        incidentRadius,
        0,
        2 * Math.PI
      )
      context.fill()

    })


  },


}










// canvas: the canvas DOM element we are rendering to
// basemapPosition: the result of the MapComputation by that name, an Immutable
// hash with width, height, and x, y (offsets to map position)
module.exports = function MapRenderer (canvas, props) {


  const context = canvas.getContext('2d')

  // clear and fill
  RenderRoutines.clear(context, props)

  // draw the map
  RenderRoutines.drawMap(context, props)
  //   also clear input buffers? 

  // draw the lines
  //   also draw to the line input buffer


  // draw the points
  RenderRoutines.drawPoints(context, props)

  //   also draw to the point input buffer

}










































