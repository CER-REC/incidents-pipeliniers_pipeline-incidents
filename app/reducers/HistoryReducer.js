import * as History from 'history'



function HistoryReducer (state = null, action) {

  switch(action.type) {
  case 'SetupHistory':
    return History.createBrowserHistory()
  case 'SetUrlFromString':
    state.push(`${location.pathname}${action.searchString}`)
    return state
  default:
    return state
  }

}


export default HistoryReducer

