const IncidentSelectionStateReducer = (state = null, action) => {

  switch(action.type) {

  case 'IncidentSelectionState':
    return action.data

  case 'IncidentDeselectionState':
    return null

  default:
    return state
  }

}


module.exports = IncidentSelectionStateReducer