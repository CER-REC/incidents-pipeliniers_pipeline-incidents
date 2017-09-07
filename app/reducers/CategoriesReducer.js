const Immutable = require('immutable')




const defaultState = Immutable.Map()

// Manages the sets of active categories

const CategoriesReducer = (state = defaultState, action) => {

  switch(action.type) {

  case 'SetInitialCategoryState':
    return action.state

  case 'ActivateAllCategoriesForColumn': {
    const activatedCategories = state.get(action.columnName).map( () => {
      return true
    })

    return state.set(action.columnName, activatedCategories)
  }

  case 'DeactivateCategory':
    return state.setIn([action.columnName, action.categoryName], false)

  case 'DeactivateAllCategoriesExceptOne': {
    const modifiedCategories = state.get(action.columnName)
      .map( (displayed, categoryName) => {
        return categoryName === action.categoryName
      })

    return state.set(action.columnName, modifiedCategories)
  }

  case 'InitializeRouterState':
    return action.categories

  default:
    return state
  }

}


module.exports = CategoriesReducer