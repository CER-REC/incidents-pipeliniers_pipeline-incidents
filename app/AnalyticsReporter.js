import V1 from 'uuid/v1'
import BrowserCookies from 'browser-cookies'

class AnalyticsReporter {
  constructor(lang) {
    if (typeof window.dataLayer === 'undefined') {
      console.warn('Google Tag Manager not found.')
    }

    this.userUuid = BrowserCookies.get('incident-UUID')
    this.lang = lang;

    if (this.userUuid === null) {
      this.userUuid = V1()
      BrowserCookies.set('incident-UUID', this.userUuid)
    }

  }

  reportEvent(category, label, value) {
    if (typeof window.dataLayer === 'undefined') { return }

    const dataObject = {
      event: 'visualization event',
      event_visualization: 'pipeline interaction',
      event_subvisualization: undefined,
      event_category: category,
      event_action: 'click',
      event_value: value,
      event_label: label,
      event_path: undefined,
      event_language: this.lang,
      event_userID: this.userUuid,
      event_count: undefined,
      event_doccount: undefined,
      event_hittimestamp: undefined,
      event_hitcount: undefined,
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('Sending GA report:', dataObject)
    }
    return window.dataLayer.push(dataObject)
  }

  reportSelectCategory(columnName) {
    this.reportEvent('graph_column_menu', undefined, columnName);
  }

  reportCategoryColumnSelect(columnName, objectValue) {
    this.reportEvent('graph_column_object', columnName, objectValue);
  }

  reportSubmenuSelection(columnName, value) {
    this.reportEvent('graph_object_submenu', columnName, value);
  }

  reportIncidentSelect(incident) {
    this.reportEvent('incident_menu', undefined, incident);
  }

  reportIncidentStar(incident) {
    this.reportEvent('incident_menu_star', undefined, incident);
  }

  reportQuestionMark(title) {
    this.reportEvent('question_mark', undefined, title);
  }

  reportQuestionMarkExpand(title, value) {
    this.reportEvent('question_mark_expand', title, value);
  }

  reportRearrange(title, label) {
    this.reportEvent('rearrange', label, title);
  }

  reportMenuButtons(title) {
    this.reportEvent('about_menu', undefined, title);
  }

  reportSocial(title) {
    this.reportEvent('social_menu', undefined, title);
  }

  reportShowHideMenu(value) {
    this.reportEvent('showhide_menu', value);
  }

  reportStoryTiles(title) {
    this.reportEvent('story_tiles', undefined, title);

    const dataObject = {
      event: 'virtualPageview',
      pageURL: window.location.href,
      pageTitle: title,
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Sending GA report:', dataObject)
    }
    return window.dataLayer.push(dataObject)
  }

  reportStoryNavigation(title, item) {
    this.reportEvent('story_tiles_nav', title, item);
  }

  reportTopNav(value) {
    this.reportEvent('top_nav', undefined, value);
  }
}

export default AnalyticsReporter;
