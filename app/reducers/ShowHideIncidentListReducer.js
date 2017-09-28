const Immutable = require('immutable')

const ShowHideIncidentListReducer = (state = true, action) => {

  switch(action.type) {

   case 'ShowHideIncidentList': 
    return !state

  case 'SetFromRouterState':
    return action.ShowHideIncidentList

  case 'ResetVisualization':
    return true

  default:
    return state

  }
}

module.exports = ShowHideIncidentListReducer