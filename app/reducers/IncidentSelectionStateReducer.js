const IncidentSelectionStateReducer = (state = null, action) => {

  switch(action.type) {

  case 'incidentSelectedState':
    return action.data


  case 'incidentDeselectedState':
    return null

  default:
    return state
  }

}


module.exports = IncidentSelectionStateReducer