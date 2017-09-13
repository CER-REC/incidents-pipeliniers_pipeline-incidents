const EmptyCategoriesReducer = (state = false, action) => {
  switch (action.type) {

  case 'ShowHideEmptyCategories': 
    return !state

  case 'SetFromRouterState':
    return action.showEmptyCategories

  case 'ResetVisualization':
    return false

  default:
    return state
  }
}

module.exports = EmptyCategoriesReducer