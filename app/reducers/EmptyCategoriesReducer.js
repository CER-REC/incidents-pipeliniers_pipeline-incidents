const EmptyCategoriesReducer = (state = false, action) => {
  switch (action.type) {

  case 'ShowHideEmptyCategories': 
    return !state

  case 'InitializeRouterState':
    return action.showEmptyCategories


  default:
    return state
  }
}

module.exports = EmptyCategoriesReducer