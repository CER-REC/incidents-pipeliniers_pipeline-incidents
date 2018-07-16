const V1 = require('uuid/v1')
const BrowserCookies = require('browser-cookies')

class AnalyticsReporter {
  constructor() {
    if (typeof window.dataLayer === 'undefined') {
      console.warn('Google Tag Manager not found.')
    }

    this.userUuid = BrowserCookies.get('incident-UUID')

    if (this.userUuid === null) {
      this.userUuid = V1()
      BrowserCookies.set('incident-UUID', this.userUuid)
    }

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
      userID: this.userUuid,
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('Sending GA report:', dataObject)
    }
    return window.dataLayer.push(dataObject)
  }
}

module.exports = AnalyticsReporter
