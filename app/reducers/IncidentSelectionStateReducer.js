const IncidentSelectionStateReducer = (state = false, action) => {

  switch(action.type) {

  case 'incidentSelectedState':
    return JSON.stringify(this.props.data)


  case 'incidentDeselectedState':
    return null

  default:
    return state
  }

}


module.exports = IncidentSelectionStateReducer