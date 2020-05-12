const defaultState = true

const ShowIncidentListReducer = (state = defaultState, action) => {

  switch(action.type) {

  case 'ShowIncidentList': 
    return !state

  case 'ResetVisualization':
    return defaultState

  default:
    return state

  }
}

export default ShowIncidentListReducer