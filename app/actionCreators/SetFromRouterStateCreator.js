
function SetFromRouterStateCreator (options) {

  return {
    type: 'SetFromRouterState',
    columns: options.columns,
    categories: options.categories,
    showEmptyCategories: options.showEmptyCategories,
    pinnedIncidents: options.pinnedIncidents,
    selectedIncidents: options.selectedIncidents,
    filterboxActivationState: options.filterboxActivationState,
    language: options.language,
  }

}

export default SetFromRouterStateCreator
