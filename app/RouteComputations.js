const Immutable = require('immutable')
const QueryString = require('query-string')
const BrowserCookies = require('browser-cookies')

const Constants = require('./Constants.js')
const Tr = require('./TranslationTable.js')

/*
The following members of the app's state are routable: they are represented in
the URL bar. When the app loads, its state is initialized from the URL bar, and
as the user navigates around the URL bar is kept up to date with the current
state.

  columns
  categories
  showEmptyCategories
  pinnedIncidents
  selectedIncident
  language

In each case, the meaning of an element's absence from the URL is specified, and
the element is not added to the URL bar if the current state matches the
meaning associated with absence.

*/

const RouteComputations = {



  paramsToUrlString: function (params) {
    const urlParts = Object.keys(params).map(key => `${key}=${params[key]}`)
    return `?${urlParts.join('&')}`
  },



  // Returns a string to form the query params of the current URL, i.e.
  // everything from the ? on
  stateToUrlParams: function (columns, categories, showEmptyCategories, pinnedIncidents, selectedIncident, language) {

    const params = {}

    // columns: represented as a comma separated list of column names.
    // When no columns are shown, the columns URL parameter is absent.
    if (columns.count() > 0) {
      params.columns = columns.join(',')
    }

    // categories: visibility settings are represented as a top level attribute 
    // for each column.
    // We store an ordered list of categories, for each column.
    // Only visible columns and their visible categories are represented.
    const categoriesForVisibleColumns = categories.filter( (categoryVisibility, columnName) => {
      return columns.contains(columnName)
    })

    categoriesForVisibleColumns.forEach( (categoryVisibility, columnName) => {
      params[columnName] = categoryVisibility.filter( visible => visible === true).keySeq().join(',')
    })

    // showEmptyCategories
    // When empty categories are shown, represented as 'true'.
    // When empty categories are hidden, absent from the URL.
    if (showEmptyCategories === true) {
      params.showEmptyCategories = true
    }

    // pinnedIncidents: represented as a comma separated list of incident 
    // numbers.
    // When there are no pinned incidents, the pinnedIncidents URL parameter is
    // absent.
    if (pinnedIncidents.count() > 0) {
      params.pinnedIncidents = pinnedIncidents.map( incident => {
        return incident.get('incidentNumber')
      }).join(',')
    }

    // selectedIncident: represented as an incident number
    // When there is no selected incident, the parameter is absent.
    if (selectedIncident !== null) {
      params.selectedIncident = selectedIncident.get('incidentNumber')
    }

    // language: represented as a string, 'en' or 'fr'
    // NB: Absence of the language parameter at page load has special meaning:
    // before assuming a default, we should check cookies.
    // Also, unlike the other parameters, we always specify the language.
    params.language = language

    return RouteComputations.paramsToUrlString(params)
  },



  // Given the URL parameters from the current location, emits an object with
  // immutable members for each chunk of the state which is routable
  // paramsString: the 'search' portion of the current location.
  // data: the incidents state
  // categories: the category display state
  urlParamsToState: function (paramsString, data, categories) {

    const rawParams = QueryString.parse(paramsString)

    return {
      columns: RouteComputations.parseUrlColumns(rawParams.columns),
      categories: RouteComputations.parseUrlCategories(rawParams, categories),
      showEmptyCategories: RouteComputations.parseUrlShowEmptyCategories(rawParams.showEmptyCategories),
      pinnedIncidents: RouteComputations.parseUrlPinnedIncidents(rawParams.pinnedIncidents, data),
      selectedIncident: RouteComputations.parseUrlSelectedIncident(rawParams.selectedIncident, data),
      language: RouteComputations.parseUrlLanguage(rawParams.language),
    }

  },



  // Each individual parsing method is repsonsible for validating inputs and
  // returning something appropriate for use as app state.


  parseUrlColumns: function (columnsString) {

    if (typeof columnsString !== 'undefined') {
      const potentialColumnNames = columnsString.split(',')

      const columnNames = potentialColumnNames.filter( columnName => {
        return Constants.get('columnNames').contains(columnName)
      })
      return Immutable.List(columnNames)
    }
    else {
      // An absent column parameter signifies that no columns are on 
      // display. In this case, we revert to the default columns.
      return Constants.get('defaultColumns')
    }

  },

  parseUrlCategories: function (rawParams, categories) {

    return categories.map( (categoryVisibility, columnName) => {

      const urlCategoryVisibility = rawParams[columnName]
      // If category information is not specified in the url, we return the
      // default (fully visible) configuration
      // This will happen for each column in the sidebar at init time.
      if (typeof urlCategoryVisibility === 'undefined') {
        return categoryVisibility
      }

      // First, for each category appearing in the URL:
      //   - mark it as visible
      //   - place it in order
      const candidateCategoryNames = urlCategoryVisibility.split(',')
      let workingCategories = Immutable.OrderedMap()
      let remainingCategories = categoryVisibility

      candidateCategoryNames.forEach( candidateCategoryName => {
        if (typeof categoryVisibility.get(candidateCategoryName) !== 'undefined') {

          workingCategories = workingCategories.set(candidateCategoryName, true)

          remainingCategories = remainingCategories.delete(candidateCategoryName)
        }
      })

      // Second, for the remaining category names which were not seen in the
      // URL, add them to the end of the state with visibility disabled.
      remainingCategories.forEach ( (visible, categoryName) => {
        workingCategories = workingCategories.set(categoryName, false)
      })

      return workingCategories
    })

  },

  parseUrlShowEmptyCategories: function (showEmptyCategoriesString) {
    return !!showEmptyCategoriesString
  },

  parseUrlPinnedIncidents: function (pinnedIncidentsString, data) {

    if (typeof pinnedIncidentsString !== 'undefined') {

      const incidentNumbers = pinnedIncidentsString.split(',')

      // For each candidate incident number, find the corresponding incident
      // and filter out any find attempts that fail. 
      const incidents = incidentNumbers.map( incidentNumber => {
        return data.find( incident => {
          return incident.get('incidentNumber') === incidentNumber
        })
      }).filter( incident => {
        return typeof incident !== 'undefined'
      })

      return Immutable.List(incidents)

    }
    else {
      // An absent pinnedIncidents parameter signifies no pinnedIncidents on 
      // display
      return Immutable.List()
    }

  },

  parseUrlSelectedIncident: function (selectedIncidentString, data) {

    if (typeof selectedIncidentString === 'undefined') {
      return null
    }

    const selectedIncident = data.find( incident => {
      return incident.get('incidentNumber') === selectedIncidentString
    })

    if (typeof selectedIncident === 'undefined') {
      return null
    }

    return selectedIncident

  },

  parseUrlLanguage: function (languageString) {

    if (languageString === 'en' || languageString === 'fr') {
      return languageString
    }

    const gc_lang_cookie = BrowserCookies.get('_gc_lang')

    switch (gc_lang_cookie) {
    case 'E':
      return 'en'
    case 'F':
      return 'fr'
    }

    // Default to English
    return 'en'

  },


  // A string for the root of the application, a suitable place for making rest
  // requests or building other URLs. E.g.:
  // http://localhost:3001/incident-visualization/
  // https://apps2.neb-one.gc.ca/incident-visualization/
  appRoot: function (location, language) {
    return `${location.origin}${Tr.getIn(['applicationPath', language])}`
  }





}




module.exports = RouteComputations