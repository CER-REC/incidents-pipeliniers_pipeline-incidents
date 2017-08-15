const d3geo = require('d3-geo')

const Constants = require('./Constants.js')


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

  clear(context, mapDimensions) {

    context.fillStyle = Constants.getIn(['map', 'backgroundColour'])
    context.fillRect(0, 0, mapDimensions.get('width'), mapDimensions.get('height'))

  },

  drawMap(context, basemapPosition) {
    const basemapImage = document.getElementById('canadaImage')

    // TODO:
    // I hope there are no race conditions associated with loading the
    // image. may need to manage that ourselves.
    context.drawImage(basemapImage, 
      basemapPosition.get('x'),
      basemapPosition.get('y'),
      basemapPosition.get('width'),
      basemapPosition.get('height')

    )
    
  },

  drawLines(context) {
    
  },

  drawPoints(context, basemapPosition, filteredData) {

    const incidentColour = Constants.getIn(['map', 'incidentCircleColour'])
    const shadowColour = Constants.getIn(['map', 'shadowColour'])
    

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
        projectedPosition[0] * ratio + xOffset + 1,
        projectedPosition[1] * ratio + yOffset + 1,
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
        projectedPosition[0] * ratio + xOffset,
        projectedPosition[1] * ratio + yOffset,
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
module.exports = function MapRenderer (canvas, basemapPosition, filteredData, mapDimensions) {


  const context = canvas.getContext('2d')

  // clear and fill
  RenderRoutines.clear(context, mapDimensions)

  // draw the map
  RenderRoutines.drawMap(context, basemapPosition)
  //   also clear input buffers? 

  // draw the lines
  //   also draw to the line input buffer


  // draw the points
  RenderRoutines.drawPoints(context, basemapPosition, filteredData)

  //   also draw to the point input buffer

}








































