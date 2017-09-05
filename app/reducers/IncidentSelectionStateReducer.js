const IncidentSelectionStateReducer = (state = null, action) => {

  switch(action.type) {

  case 'IncidentSelectionState':
    return action.data

  case 'IncidentDeselectionState':
    return null

  case 'AddPinnedIncident':
    // Some assumptions:
    // - An incident can either be selected, or pinned, but not both. 
    // - Only the currently selected incident can become pinned
    // So, when we pin an incident we should clear the selection.
    return null

  default:
    return state
  }

}


module.exports = IncidentSelectionStateReducer