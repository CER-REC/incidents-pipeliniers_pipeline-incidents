const React = require('react')
const RouteComputations = require('./RouteComputations.js')

class AnalyticsReporter {
  constructor() {
    if (typeof window.dataLayer === 'undefined') {
      console.warn('Google Tag Manager not found.')
    }
  }

  reportEvent(category, action, filter, eventDetail) {
    if (typeof window.dataLayer === 'undefined') { return }

    const dataObject = {
      event: 'visualization interaction',
      category: category,
      action: action,
      filter: window.location.href.split('?')[1],
      label: eventDetail,
      visualization: 'pipeline incidents',
    }
    console.log('Sending GA report:', dataObject)
    return window.dataLayer.push(dataObject)
  }
}

module.exports = AnalyticsReporter
