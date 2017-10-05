

const HoveredIncidentReducer = (state = null, action) => {

  switch(action.type) {

  case 'HoverIncident':
    return action.incident

  case 'UnhoverIncident':
  case 'RemovePinnedIncident':
    return null

  default:
    return state
  }

}


module.exports = HoveredIncidentReducer