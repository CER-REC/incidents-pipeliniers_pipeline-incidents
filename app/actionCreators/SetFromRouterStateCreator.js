
function SetFromRouterStateCreator (options) {

  return {
    type: 'SetFromRouterState',
    columns: options.columns,
    categories: options.categories,
    showEmptyCategories: options.showEmptyCategories,
    pinnedIncidents: options.pinnedIncidents,
    language: options.language,
    screenshotMode: options.screenshotMode,
  }

}

module.exports = SetFromRouterStateCreator