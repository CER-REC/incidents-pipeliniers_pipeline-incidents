const History = require('history')



function HistoryReducer (state = History.createBrowserHistory(), action) {

  switch(action.type) {
  case 'SetUrlFromString':
    state.push(`${location.pathname}${action.searchString}`)
    return state
  default:
    return state
  }

}


module.exports = HistoryReducer

