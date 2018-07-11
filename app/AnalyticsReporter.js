const V1 = require('uuid/v1')

class AnalyticsReporter {
  constructor() {
    if (typeof window.dataLayer === 'undefined') {
      console.warn('Google Tag Manager not found.')
    }

    this.sessionUuid = V1()
  }

  reportEvent(category, action, eventDetail) {
    if (typeof window.dataLayer === 'undefined') { return }

    const dataObject = {
      event: 'visualization interaction',
      category: category,
      action: action,
      filter: window.location.href.split('?')[1],
      label: eventDetail,
      visualization: 'pipeline incidents',
      userID: this.sessionUuid,
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('Sending GA report:', dataObject)
    }
    return window.dataLayer.push(dataObject)
  }
}

module.exports = AnalyticsReporter
