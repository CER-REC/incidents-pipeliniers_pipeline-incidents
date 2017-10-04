const Immutable = require('immutable')

const defaultState = Immutable.Map({
  columnName: null,
  categoryName: null,
})

const FilterboxActivationStateReducer = (state = defaultState, action) => {

  switch(action.type) {

  case 'ActivateFilterbox':
    return Immutable.Map({
      columnName: action.columnName,
      categoryName: action.categoryName,
    })

  case 'ResetVisualization':
    return Immutable.Map({
      columnName: null,
      categoryName: null,
    })

  case 'HideFilterbox':
    return Immutable.Map({
      columnName: null,
      categoryName: null,
    })

  default:
    return state
  }

}


module.exports = FilterboxActivationStateReducer


