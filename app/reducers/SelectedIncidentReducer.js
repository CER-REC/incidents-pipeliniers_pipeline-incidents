const Immutable = require('immutable')

const SelectedIncidentReducer = (state = Immutable.List(), action) => {

  switch(action.type) {

  case 'AddSelectedIncident':
    if(!state.contains(action.incident)) {
      return state.push(action.incident)
    }
    else {
      return state
    }

  case 'RemoveSelectedIncident':
    return state.filter( incident => incident !== action.incident)

  // When the user changes the currently selected category, we clear the
  // set of selected incidents.
  case 'ActivateFilterbox':
  case 'HideFilterbox':
    return Immutable.List()

  default:
    return state
  }

}


module.exports = SelectedIncidentReducer