const Immutable = require('immutable')

// For now, we will model pinned incidents as a list of incident objects
// TODO: We may wish to store the incidents sorted by their vertical position, 
// later

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

  default:
    return state
  }

}


module.exports = PinnedIncidentReducer