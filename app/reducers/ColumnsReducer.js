const Immutable = require('immutable')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')

const defaults = Immutable.fromJS([
  'year',
  'incidentTypes',
  'status',
  'pipelineSystemComponentsInvolved',
  /*'substance',
  'volumeCategory',
  'releaseType',
  'whatHappened',
  'whyItHappened',*/
  //'pipelinePhase',
  //'substanceCategory',
  //'company',
  //'map',
  //'province',
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
    const columnWidth = WorkspaceComputations.columnWidth(state)

    let multiplier = 3
    if(columnWidth === Constants.get('columnNarrowWidth')) {
      multiplier = 5
    }

    const jump = Math.round(Math.abs(action.newX - action.oldX)/(multiplier*columnWidth))

    if(action.oldX > action.newX) {
      const newIndex = Math.max(currentIndex - jump, 0)
      return state.delete(currentIndex).insert(newIndex, action.columnName)
    }

    else if(action.oldX < action.newX) {
      const newIndex = currentIndex + jump

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