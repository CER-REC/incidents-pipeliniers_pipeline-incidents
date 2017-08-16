const MemoizeImmutable = require('memoize-immutable')
const Immutable = require('immutable')

const WorkspaceComputations = require('./WorkspaceComputations.js')
const Constants = require('./Constants.js')

const MapComputations = {}





MapComputations.basemapPosition = function (showEmptyCategories, viewport, data, columns, categories) {

  let position = Immutable.Map()

  const padding = Constants.getIn(['map', 'padding'])

  const mapDimensions = WorkspaceComputations.mapDimensions(showEmptyCategories, viewport, data, columns, categories)

  const paddedDimensions = mapDimensions
    .set('width', mapDimensions.get('width') - padding * 2)
    .set('height', mapDimensions.get('height') - padding * 2)

  const xRatio = paddedDimensions.get('width') / 
    Constants.getIn(['map', 'coordinateSpace', 'width'])
  const yRatio = paddedDimensions.get('height') /
    Constants.getIn(['map', 'coordinateSpace', 'height'])

  let ratio
  if (xRatio < 1 && yRatio < 1) {
    ratio = Math.max(xRatio, yRatio)
  }
  else if (xRatio < 1){
    ratio = xRatio
  }
  else if (yRatio < 1) {
    ratio = yRatio
  }
  else {
    ratio = Math.min(xRatio, yRatio)
  }

  position = position.set('ratio', ratio)

  position = position.set('width', ratio * 
    Constants.getIn(['map', 'coordinateSpace', 'width']))
  position = position.set('height', ratio * 
    Constants.getIn(['map', 'coordinateSpace', 'height']))

  
  // For each width and height, if the map SVG will be scaled smaller than the
  // height of the container element, we offset its position by half its
  // height/width to centre it

  if (position.get('width') < paddedDimensions.get('width') ) {
    const space = paddedDimensions.get('width') - position.get('width')
    position = position.set('x', space / 2)
  }
  else {
    position = position.set('x', 0)
  }

  if (position.get('height') < paddedDimensions.get('height') ) {
    const space = paddedDimensions.get('height') - position.get('height')
    position = position.set('y', space / 2)
  }
  else {
    position = position.set('y', 0)
  }




  return position
}






// The centre of the map element.
MapComputations.basemapCentre = function (showEmptyCategories, viewport, data, columns, categories) {

  const mapDimensions = WorkspaceComputations.mapDimensions(
    showEmptyCategories,
    viewport,
    data,
    columns,
    categories)  

  return Immutable.Map({
    x: mapDimensions.get('width') / 2,
    y: mapDimensions.get('height') / 2,
  })

}



// In order to make lines and other features clickable on the map canvas, we
// assign a unique colour to each incident. In a hidden, internal canvas 
// element, we paint the incident's lines and dot with its colour. Then, 
// finding the incident which was clicked on is as simple as looking up the
// colour at the click point in the hidden canvas.

// In order to look up the incident efficiently, and to look up its colour to
// paint with we need a bidirectional map of incidents => colours and
// colours => incidents

MapComputations.canvasInputColourMap = function (data) {

  // With 24 bits of colour, we can handle 2^24 = 16 million incidents.
  // More than we will presumably ever be tasked with rendering.
  // NB: We use 0,0,0 as the 'clear' style for the canvas element
  let r = 1
  let g = 0
  let b = 0

  const incidentNumberToColourMap = {}
  const colourToIncidentNumberMap = {}

  data.forEach( incident => {

    const colour = `rgb(${r}, ${g}, ${b})`
    incidentNumberToColourMap[incident.get('incidentNumber')] = colour
    colourToIncidentNumberMap[colour] = incident.get('incidentNumber')

    r += 1
    if (r === 256) {
      r = 0
      g += 1
    }
    if (g === 256) {
      g = 0
      b += 1
    }
    if (b === 256) {
      throw new Error('too many incidents to render!')
    }

  })

  return Immutable.fromJS({
    incidentNumberToColourMap: incidentNumberToColourMap,
    colourToIncidentNumberMap: colourToIncidentNumberMap,
  })


}













const MemoizedComputations = {}

for (const name of Object.keys(MapComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(MapComputations[name])
}

window.mc = MemoizedComputations
module.exports = MemoizedComputations