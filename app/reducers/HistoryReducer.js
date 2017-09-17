const History = require('history')



function HistoryReducer (state = History.createBrowserHistory(), action) {
  return state
}


module.exports = HistoryReducer

