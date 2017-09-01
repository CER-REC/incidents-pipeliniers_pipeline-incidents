const Immutable = require('immutable')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')

const defaults = Immutable.fromJS([
  'province',
  'incidentTypes',


  // 'year',
  // 'status',
  // 'pipelineSystemComponentsInvolved',
  // 'substance',
  // 'volumeCategory',
  // 'releaseType',
  // 'whatHappened',
  // 'whyItHappened',
  // 'pipelinePhase',
  // 'substanceCategory',
  // 'company',
  // 'map',
])




const ColumnsReducer = (state = defaults, action) => {

  switch(action.type) {

  case 'AddColumn':
    // Only real column names allowed
    if(!Constants.get('columnNames').contains(action.columnName)) {
      return state
    }

    if (state.contains(action.columnName)) {
      // Return if this column already exists in the set
      return state
    }
    else { 
      // Add the column to end of the list
      return state.push(action.columnName)
    }

  case 'AddColumnAtPosition':
    // Only real column names allowed
    if(!Constants.get('columnNames').contains(action.columnName)) {
      return state
    }

    if (state.contains(action.columnName)) {
      // Return if this column already exists in the set
      return state
    }

    // Dragging a sidebar column to the right should
    // do nothing.
    else if(action.oldX < action.newX) {
      return state
    }

    else {
      const stepWidth = WorkspaceComputations.stepWidth(state, action.viewport)
      const displacement = Math.abs(action.newX - action.oldX)
      const jump = Math.floor(displacement/stepWidth)

      const newIndex = (state.count() - jump < 0)? 0: state.count() - jump
      return state.insert(newIndex, action.columnName)      
    }

  case 'RemoveColumn':
    if (state.contains(action.columnName)) {
      return state.filter( item => {
        item !== action.columnName
      })
    }
    else {
      return state
    }

  case 'SetColumnsTo': {
    const columnNames = Constants.get('columnNames')

    // Only permit valid column names
    const validatedColumnNames = action.columnNames.filter( columnName => {
      columnNames.contains(columnName)      
    })

    return Immutable.List(validatedColumnNames)
  }

  case 'SnapColumn': {
    const currentIndex = state.indexOf(action.columnName)

    // Compute the map width (if visible).
    const mapWidth = WorkspaceComputations.mapDragWidth(action.viewport)
    const mapIndex = state.indexOf('map')

    const stepWidth = WorkspaceComputations.stepWidth(state, action.viewport)
    let displacement = Math.abs(action.newX - action.oldX)

    // The step width when dragging the map has to take 
    // into consideration the width of the map.
    if(action.columnName === 'map') {
      displacement -= (mapWidth / 2)
      displacement = (displacement > 0)? displacement + stepWidth: 0
    }
    let jump = Math.floor(displacement/stepWidth)

    if(action.oldX > action.newX) {
      let newIndex = (currentIndex - jump < 0)? 0: Math.max(currentIndex - jump, 0)

      // Handle jumping over the map.
      if(mapIndex < currentIndex &&
        currentIndex - mapIndex <= jump) {
        const mapStepSize = Math.floor(mapWidth/stepWidth)
        const stepRemainder = (jump - ((currentIndex - 1) - mapIndex)) - (mapStepSize - 1)
        if(stepRemainder >= 0) {
          jump = ((currentIndex - 1) - mapIndex) + stepRemainder + 1
        }
        else {
          jump = (currentIndex - 1) - mapIndex
        }

        newIndex = (currentIndex - jump < 0)? 0 : currentIndex - jump
      }

      return state.delete(currentIndex).insert(newIndex, action.columnName)
    }

    else if(action.oldX < action.newX) {
      let newIndex = currentIndex + jump

      // Handle jumping over the map.
      if(mapIndex > currentIndex &&
        mapIndex - currentIndex <= jump) {
        const mapStepSize = Math.floor(mapWidth/stepWidth)
        const stepRemainder = (jump - (mapIndex - (currentIndex + 1))) - (mapStepSize - 1)
        if(stepRemainder >= 0) {
          jump = (mapIndex - (currentIndex + 1)) + stepRemainder + 1
        }
        else {
          jump = mapIndex - (currentIndex + 1)
        }

        newIndex = currentIndex + jump
      }

      if(newIndex < state.count()) {
        return state.delete(currentIndex).insert(newIndex, action.columnName)        
      }
      else {
        return state.delete(currentIndex)
      }
    }

    return state
  }

  default:
    return state
  }
}

module.exports = ColumnsReducer