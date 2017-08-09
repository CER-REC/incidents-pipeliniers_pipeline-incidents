const Immutable = require('immutable')

const Constants = require('../Constants.js')

const defaults = Immutable.fromJS([
  // 'incidentTypes',
  // 'province',

  'incidentTypes',
  'year',
  'company',
  'status',
  'province',
  'substance',
  'releaseType',
  'whatHappened',
  'whyItHappened',
  'pipelinePhase',
  'volumeCategory',
  'substanceCategory',
  'pipelineSystemComponentsInvolved',
  'map',
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


  default:
    return state
  }

}


module.exports = ColumnsReducer