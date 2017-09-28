

const HoveredIncidentReducer = (state = null, action) => {

  switch(action.type) {

  case 'HoverIncident':
    return action.incident

  case 'UnhoverIncident':
    return null

  default:
    return state
  }

}


module.exports = HoveredIncidentReducer