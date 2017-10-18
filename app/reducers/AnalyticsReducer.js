//const Analytics = require('event')


function AnalyticsReducer (state = null, action) {

  switch(action.type) {
  case 'SetUpAnalytics':
    return action.analytics
  default:
    return state
  }

}


module.exports = AnalyticsReducer
