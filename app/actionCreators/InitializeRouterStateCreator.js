
function InitializeRouterStateCreator (options) {

  return {
    type: 'InitializeRouterState',
    columns: options.columns,
    categories: options.categories,
    showEmptyCategories: options.showEmptyCategories,
    pinnedIncidents: options.pinnedIncidents,
    selectedIncident: options.selectedIncident,
    language: options.language,
  }

}

module.exports = InitializeRouterStateCreator