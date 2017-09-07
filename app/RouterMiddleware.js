const RouteComputations = require('./RouteComputations.js')

// NB: This list needs to be kept up to date with the actions which affect the
// routable state

// NB: These actions should NOT trigger the router and should not be in the set:
//   InitializeRouterState 
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
]




// Redux middleware to update the URL location 

const RouterMiddleware = store => next => action => {

  const result = next(action)

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

    // TODO: verify that storing only part of the location like this is OK.
    state.history.push(`${location.pathname}${paramString}`, {
      // columns: state.columns,
      // categories: state.categories,
      // showEmptyCategories: state.showEmptyCategories,
      // pinnedIncidents: state.pinnedIncidents,
      // selectedIncident: state.selectedIncident,
      // language: state.language,
    })

  }

  return result
}



module.exports = RouterMiddleware