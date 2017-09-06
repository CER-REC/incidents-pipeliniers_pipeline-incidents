const Immutable = require('immutable')
const QueryString = require('query-string')

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


  stateToUrlParams: function (columns, categories, showEmptycategories, pinnedIncidents, selectedIncident, language) {

    const params = {}

    // columns: represented as a comma separated list of column names.
    // When no columns are shown, the columns URL parameter is absent.
    if (columns.count() > 0) {
      params.columns = columns.join(',')
    }

    // categories: represented as a JSON object.
    // The keys are column names, the values are lists of category names for
    // the categories which are visible.
    // Only categories for visible columns are represented.
    // When all categories are visible, the categories URL parameter is absent.
    // TODO: We might want to represent categories which have been hidden
    // instead?
    const categoriesForVisibleColumns = categories.filter( (categoryVisibility, columnName) => {
      return columns.contains(columnName)
    })

    if (categoriesForVisibleColumns.count() > 0) {

      const categoryParams = categoriesForVisibleColumns.map( (categoryVisibility) => {
        return categoryVisibility.filter(visible => visible === true).keySeq()
      })

      // TODO: currently, we always write our huge object to the URL bar, even
      // when everything is on display... blargh.

      params.categories = JSON.stringify(categoryParams.toJS())

    }

    // showEmptyCategories
    // When empty categories are show, represented as 'true'.
    // When empty categories are hidden, absent from the URL.
    // TODO: we should probably also parse 'false' for this attribute as
    // equivalent... 
    if (showEmptycategories === true) {
      params.showEmptycategories = true
    }

    // pinnedIncidents: represented as a comma separated list of incident 
    // numbers.
    // When there are no pinned incidents, the pinnedIncidents URL parameter is
    // absent.
    if (pinnedIncidents.count() > 0) {
      params.pinnedIncidents = pinnedIncidents.map( incident => incident.get('incidentNumber')).join(',')
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

    console.log(params)
    return QueryString.stringify(params)
  },



  // Given the URL parameters from the current location, emits an object with
  // immutable members for each chunk of the state which is routable
  // paramsString: the 'search' portion of the current location.
  urlParamsToState: function (paramsString) {

    const params = QueryString.parse(paramsString)

  }












}




module.exports = RouteComputations