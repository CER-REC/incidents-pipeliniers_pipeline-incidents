
function SetFromRouterStateCreator (options) {

  return {
    type: 'SetFromRouterState',
    columns: options.columns,
    categories: options.categories,
    showEmptyCategories: options.showEmptyCategories,
    pinnedIncidents: options.pinnedIncidents,
    selectedIncident: options.selectedIncident,
    language: options.language,
  }

}

module.exports = SetFromRouterStateCreator