class AnalyticsReporter {
  constructor() {
    if(window.ga) {
      this.ga = window.ga
    } else {
      console.warn('Google analytics object not found.')
    }
  }

  reportEvent(category, action) {
    if (!this.ga) { 
      return 
    }
    return this.ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action
    })
  }
}

module.exports = AnalyticsReporter