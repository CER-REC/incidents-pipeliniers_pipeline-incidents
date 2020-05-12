function AnalyticsReducer (state = null, action) {

  switch(action.type) {
  case 'SetUpAnalytics':
    return action.analytics
  default:
    return state
  }

}


export default AnalyticsReducer
