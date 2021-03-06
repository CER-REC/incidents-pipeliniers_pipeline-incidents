import Immutable from 'immutable'

const SelectedIncidentsReducer = (state = Immutable.List(), action) => {

  switch(action.type) {

  case 'AddSelectedIncident':
    if(!state.contains(action.incident)) {
      return state.push(action.incident)
    }
    else {
      return state
    }

  case 'ResetVisualization':
    return Immutable.List()

  case 'RemoveSelectedIncident':
    return state.filter( incident => incident !== action.incident)

  // When the user changes the currently selected category, we clear the
  // set of selected incidents.
  case 'ActivateFilterbox':
  case 'HideFilterbox':
    return Immutable.List()

  case 'SetFromRouterState':
    return action.selectedIncidents

  default:
    return state
  }

}


export default SelectedIncidentsReducer