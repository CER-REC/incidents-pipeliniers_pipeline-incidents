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
      filter: filter,
      label: eventDetail,
      visualization: 'pipeline incidents',
    }

    console.log('Sending GA report:', dataObject)
    return window.dataLayer.push(dataObject)
  }
}

module.exports = AnalyticsReporter
