const Immutable = require('immutable')

const ShowIncidentListReducer = (state = true, action) => {

  switch(action.type) {

  case 'ShowIncidentList': 
    return !state

  case 'ResetVisualization':
    return true

  default:
    return state

  }
}

module.exports = ShowIncidentListReducer