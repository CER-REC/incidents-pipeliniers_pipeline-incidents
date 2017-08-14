const MemoizeImmutable = require('memoize-immutable')
const Immutable = require('immutable')

const WorkspaceComputations = require('./WorkspaceComputations.js')
const Constants = require('./Constants.js')

const MapComputations = {}





MapComputations.basemapPosition = function (showEmptyCategories, viewport, data, columns, categories) {

  let position = Immutable.Map()

  const mapDimensions = WorkspaceComputations.mapDimensions(showEmptyCategories, viewport, data, columns, categories)

  const xRatio = mapDimensions.get('width') / Constants.getIn(['map', 'coordinateSpace', 'width'])
  const yRatio = mapDimensions.get('height') / Constants.getIn(['map', 'coordinateSpace', 'height'])

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

  position = position.set('width', ratio * Constants.getIn(['map', 'coordinateSpace', 'width']))
  position = position.set('height', ratio * Constants.getIn(['map', 'coordinateSpace', 'height']))

  
  // For each width and height, if the map SVG will be scaled smaller than the
  // height of the container element, we offset its position by half its
  // height/width to centre it

  if (position.get('width') < mapDimensions.get('width') ) {
    let space = mapDimensions.get('width') - position.get('width')
    position = position.set('x', space / 2)
  }
  else {
    position = position.set('x', 0)
  }

  if (position.get('height') < mapDimensions.get('height') ) {
    let space = mapDimensions.get('height') - position.get('height')
    position = position.set('y', space / 2)
  }
  else {
    position = position.set('y', 0)
  }




  return position
}


























const MemoizedComputations = {}

for (const name of Object.keys(MapComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(MapComputations[name])
}

window.mc = MemoizedComputations
module.exports = MemoizedComputations