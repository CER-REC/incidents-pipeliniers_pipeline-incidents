const Immutable = require('immutable')

const ShowIncidentListReducer = (state = false, action) => {

  switch(action.type) {

  case 'ShowIncidentList': 
    return !state

  case 'SetFromRouterState':
    return action.ShowHideIncidentList

  case 'ResetVisualization':
    return false

  default:
    return state

  }
}

module.exports = ShowIncidentListReducer