const SetUpAnalyticsCreator = function (analytics) {
  return {
    type: 'SetUpAnalytics',
    analytics: analytics,
  }

}

module.exports = SetUpAnalyticsCreator