const Immutable = require('immutable')

const PinnedIncidentReducer = (state = Immutable.List(), action) => {

  switch(action.type) {

  case 'AddPinnedIncident':
    if(!state.contains(action.incident)) {
      return state.push(action.incident)
    }
    else {
      return state
    }

  case 'RemovePinnedIncident':
    return state.filter( incident => incident !== action.incident)

  case 'SetFromRouterState':
    return action.pinnedIncidents

  default:
    return state
  }

}


module.exports = PinnedIncidentReducer