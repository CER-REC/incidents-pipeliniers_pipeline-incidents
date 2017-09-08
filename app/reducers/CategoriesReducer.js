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

  case 'SnapCategory': {
    const currentIndex = state.get(action.columnName)
      .keySeq()
      .findIndex(k => k=== action.categoryName)
    let currentHeight = 0
    
    let newPosition = currentIndex
    let stepArray = []
    const displacement = Math.abs(action.newY - action.oldY)
    let cummulativeHeight = currentHeight / 2
    let modifiedCategories = Immutable.OrderedMap()
    let index = 0

    action.categoryHeights.forEach((height, category) => {
      stepArray.push(height)
      if(category === action.categoryName) currentHeight = height
    })

    if(action.newY - action.oldY < 0) {
      for (let i = currentIndex - 1; i >= 0; i--) {
        cummulativeHeight += stepArray[i]
        if(cummulativeHeight <= displacement) {
          newPosition -= 1
        }
      }

      action.categoryHeights.forEach((height, category) => {
        if(index === newPosition) {
          modifiedCategories = modifiedCategories.set(action.categoryName, 
            state.get(action.columnName).get(action.categoryName))
        }
        if(index !== currentIndex) {
          modifiedCategories = modifiedCategories.set(category, 
            state.get(action.columnName).get(category))
        }
        index += 1
      })
    }
    else if(action.newY - action.oldY > 0) {
      for (let i = currentIndex + 1; i < stepArray.length; i++) {
        cummulativeHeight += stepArray[i]
        if(cummulativeHeight <= displacement) {
          newPosition += 1
        }
      }

      action.categoryHeights.forEach((height, category) => {
        if(index !== currentIndex) {
          modifiedCategories = modifiedCategories.set(category, 
            state.get(action.columnName).get(category))
        }
        if(index === newPosition) {
          modifiedCategories = modifiedCategories.set(action.categoryName, 
            state.get(action.columnName).get(action.categoryName))
        }
        index += 1
      })
    }
    else {
      return state
    }

    // Add any empty categories to the modified categories map.
    state.get(action.columnName).forEach((displayed, categoryName) => {
      if(!modifiedCategories.contains(categoryName)) {
        modifiedCategories = modifiedCategories.set(categoryName, displayed)
      }
    })

    return state.set(action.columnName, modifiedCategories)
  }

  default:
    return state
  }

}


module.exports = CategoriesReducer