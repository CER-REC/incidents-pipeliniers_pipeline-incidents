const Constants = require('./Constants.js')



const RenderRoutines = {

  clear(context, basemapPosition) {

    context.fillStyle = Constants.getIn(['map', 'backgroundColour'])
    context.fillRect(0, 0, basemapPosition.get('width'), basemapPosition.get('height'))

  },

  drawMap(context, basemapPosition) {
    const basemapImage = document.getElementById('canadaImage')

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

  drawPoints(context) {

  },


}










// canvas: the canvas DOM element we are rendering to
// basemapPosition: the result of the MapComputation by that name, an Immutable
// hash with width, height, and x, y (offsets to map position)
module.exports = function MapRenderer (canvas, basemapPosition) {

  const context = canvas.getContext('2d')

  // clear and fill
  RenderRoutines.clear(context, basemapPosition)
  RenderRoutines.drawMap(context, basemapPosition)

  // draw the map
  //   also clear input buffers? 
  // draw the lines
  //   also draw to the line input buffer
  // draw the points
  //   also draw to the point input buffer

}








































