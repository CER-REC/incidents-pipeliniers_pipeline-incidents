const RouteComputations = require('./RouteComputations.js')

// NB: This list needs to be kept up to date with the actions which affect the
// routable state

// NB: These actions should NOT trigger the router and should not be in the set:
//   SetFromRouterState 
//   SetInitialCategoryState

const routableStateActions = [
  'AddPinnedIncident',
  'RemovePinnedIncident',
  'SetLanguage',
  'IncidentSelectionState',
  'IncidentDeselectionState',
  'ShowHideEmptyCategories',
  'AddColumn',
  'AddColumnAtPosition',
  'RemoveColumn',
  'SetColumnsTo',
  'SnapColumn',
  'ActivateAllCategoriesForColumn',
  'DeactivateCategory',
  'DeactivateAllCategoriesExceptOne',
  'SnapCategory',
]


// Redux middleware to update the URL location, after actions have lead to state
// changes.

const RouterMiddleware = store => next => action => {

  const result = next(action)

  // TODO: A better approach than this: save the relevant state, test if it has
  // changed ..
  if (routableStateActions.includes(action.type)) {
    
    const state = store.getState()
    const paramString = RouteComputations.stateToUrlParams(
      state.columns,
      state.categories,
      state.showEmptyCategories,
      state.pinnedIncidents,
      state.selectedIncident,
      state.language
    )


    state.history.push(`${location.pathname}${paramString}`)

  }

  return result
}



module.exports = RouterMiddleware