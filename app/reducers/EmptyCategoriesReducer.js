const EmptyCategoriesReducer = (state = false, action) => {
  switch (action.type) {

  case 'ShowHideEmptyCategories': 
    return !state

  default:
    return state
  }
}

module.exports = EmptyCategoriesReducer