
const IncidentListScrollPositionReducer = function (state = 0, action) {

  switch(action.type) {
  case 'SetIncidentListScroll':
    return action.scrollTop

  case 'ActivateFilterbox':
  case 'HideFilterbox':
    // When the contents of the scrolling list change due to a filterbox being
    // displayed or hidden, we should reset the scroll position.
    return 0

  default:
    return state
  }
}



export default IncidentListScrollPositionReducer