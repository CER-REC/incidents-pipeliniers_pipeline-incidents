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

These items are represented as URL parameters:
  columns
  categories
  showEmptyCategories
  pinnedIncidents

Language is also represented, but is inferred from the application path. 
  en: /pipeline-incidents
  fr: /incidents-pipeliniers
See applicationPath in TranslationTable.js

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
  stateToUrlParams: function (columns, categories, showEmptyCategories, pinnedIncidents, selectedIncidents, filterboxActivation) {

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

    // selectedIncidents: represented as a comma separated list of incident 
    // numbers.
    // When there are no selected incidents, the selectedIncidents URL parameter is
    // absent.
    if (selectedIncidents.count() > 0) {
      params.selectedIncidents = selectedIncidents.map( incident => {
        return incident.get('incidentNumber')
      }).join(',')
    }

    // fbas_columnName: represented as a selected column for the filter 
    // fbas_categoryName: represented as a selected category for the filter
    // When there are no filterboxActivationState selected, then 
    // fbas_columnName and fbas_categoryName URL parameter is absent.
    if(filterboxActivation.columnName !== null && filterboxActivation.categoryName !== null){
      filterboxActivation.forEach( (filter, filterName) => {
        if(filter !== null){
          params['fbas_'+filterName] = filter
        } 
      } )
    }

    return RouteComputations.paramsToUrlString(params)
  },



  // Given the URL parameters from the current location, emits an object with
  // immutable members for each chunk of the state which is routable
  // paramsString: the 'search' portion of the current location.
  // data: the incidents state
  // categories: the category display state
  urlParamsToState: function (location, data, categories) {

    const rawParams = QueryString.parse(location.search)

    return {
      columns: RouteComputations.parseUrlColumns(rawParams.columns),
      categories: RouteComputations.parseUrlCategories(rawParams, categories),
      showEmptyCategories: RouteComputations.parseUrlShowEmptyCategories(rawParams.showEmptyCategories),
      pinnedIncidents: RouteComputations.parseUrlPinnedIncidents(rawParams.pinnedIncidents, data),
      selectedIncidents: RouteComputations.parseUrlSelectedIncidents(rawParams.selectedIncidents, rawParams.fbas_columnName, data),
      filterboxActivationState: RouteComputations.parseUrlFilterBoxActivationState(rawParams.fbas_columnName, rawParams.fbas_categoryName, categories),
      language: RouteComputations.parseUrlLanguage(location),
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

        // Years are represented as integers in the categories structure, but
        // are read as strings from the URL bar.
        // TODO: Change years to be internally represented as strings,
        // like every other category type
        if (columnName === 'year') {
          candidateCategoryName = parseInt(candidateCategoryName)
        }

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

  /**
   * @selectedIncidentsString  {String} It is a comma seperated value of 
   *                                    selected incident
   * @columnName  {String} It is a columnName from the 
   *                       filterBoxActivationState. This checks if 
   *                       fbas_columnName in the URL param is set or not, 
   *                       as filter activation state decides whether 
   *                       incidents in the list are visible or not on 
   *                       the user or not.
   * @data  Incident state
   * @return {Immutable}
   */
  parseUrlSelectedIncidents: function (selectedIncidentsString, columnName, data) {

    if (typeof selectedIncidentsString !== 'undefined' && typeof columnName !== 'undefined' && columnName !== null) {

      const incidentNumbers = selectedIncidentsString.split(',')

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
      // An absent selectedIncidents parameter signifies no selectedIncidents on 
      // display
      return Immutable.List()
    }

  },

  parseUrlLanguage: function (location) {

    if (location.pathname.match(Tr.getIn(['applicationPath', 'en']))) {
      return 'en'
    }

    if (location.pathname.match(Tr.getIn(['applicationPath', 'fr']))) {
      return 'fr'
    }

    // TODO: it's not clear that it is meaningful to check cookies anymore,
    // given that the application should always be served from one or the other
    // of the English and French endpoints. Remove?
    // TODO: What should we do when the user requests, for example, the English
    // page with the language cookie set for French?

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

  /**
   * Function creates a filterBoxActivationState using the URL param
   * @columnName  {string} selected column value
   * @categoryName  {string} selected category for the column
   * @categories
   * @return {ImmutableMap}
   */
  parseUrlFilterBoxActivationState: function(columnName, categoryName, categories){

    if(typeof columnName !== 'undefined' && typeof categoryName !== 'undefined'){
      //Validate column and category name
      let isColumnAndCategoryValid = false
      if(categories.has(columnName)){
        const categoriesValues = categories.get(columnName)
        if (columnName === 'year') {
          categoryName = parseInt(categoryName)
        }
        if(typeof categoriesValues.get(categoryName) !== 'undefined' ){
          isColumnAndCategoryValid = true         
        }
      }
      if(isColumnAndCategoryValid){
        return Immutable.Map(
          {
            columnName: columnName,
            categoryName: categoryName
          }
        )
      }
    }
    return Immutable.Map({
      columnName: null,
      categoryName: null,
    })
  },

  screenshotMode: function (location) {
    return !!location.pathname.match(`/${Constants.get('appScreenshotPath')}$`)
  },

  // A string for the root of the application, a suitable place for making rest
  // requests or building other URLs. E.g.:
  // http://localhost:3001/pipeline-incidents/
  // https://apps2.neb-one.gc.ca/incidents-pipeliniers/
  appRoot: function (location, language) {
    return `${location.origin}${Tr.getIn(['applicationPath', language])}`
  },


  // Based on the current URL, construct a URL to the screenshottable version
  // of the visualization, and also encode it for use as a URL parameter itself.
  // The server will make the request of localhost, we only need to construct
  // the remainder of the path
  // NB: Location.pathname includes the leading slash in the url, e.g.:
  // In 'foo.com/bar', pathname is '/bar'
  screenshotParameter: function (location) {
    return encodeURIComponent(`${location.pathname}screenshot${location.search}`)
  },

  bitlyParameter: function (location, language) {
    return `${Constants.get('appHost')}${Tr.getIn(['applicationPath', language])}${encodeURIComponent(location.search)}`
  },


  screenshotOrigin: function (location) {
    switch(process.env.NODE_ENV) {
    case 'development':
      return 'http://localhost:3002'
    case 'production':
      return location.origin
    }
  },

  bitlyEndpoint: function (location, language) {

    switch(process.env.NODE_ENV) {
    case 'development': { 
      const root = RouteComputations.appRoot(location, language)
      return `${root}bitly_url`
    }
    case 'production':
      return `${location.origin}/bitlyService/api/bitlyShortlink`
    }

  },

  dataServiceEndpoint(location, language) {
    const appRoot = RouteComputations.appRoot(location, language)

    if (process.env.NODE_ENV === 'development') {
      // In development, read from a local flat file.
      // NB: At this writing, the contents of this file are a little out of date
      return `${appRoot}data/2018-01-17 incidents.json`
    }
    else if (process.env.NODE_ENV === 'production') {
      // When the web app is bundled for production (which includes the TEST 
      // environment at NEB) use the local data service
      return `${appRoot}incidentData`
    }

  },

  schemaServiceEndpoint(location, language) {
    const appRoot = RouteComputations.appRoot(location, language)

    if (process.env.NODE_ENV === 'development') {
      // In development, read from a local flat file.
      // NB: At this writing, the contents of this file are a little out of date
      return `${appRoot}data/CategorySchema.json`
    }

    // When the web app is bundled for production (which includes the TEST 
    // environment at NEB) use the local schema service
    return `${appRoot}schemaData`
  },
}




module.exports = RouteComputations
