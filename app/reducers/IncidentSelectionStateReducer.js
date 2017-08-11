const Immutable = require('immutable')

//store object
const defaultState = Immutable.Map()

const IncidentSelectionStateReducer = (state = false, action) => {

  switch(action.type) {

  case 'incidentSelected':
    //if selected, then show incident number string
    //set immutable incident object state
    return state


  case 'incidentDeselected':
    //show null
    return state


  default:
    return state
  }




}


module.exports = IncidentSelectionStateReducer