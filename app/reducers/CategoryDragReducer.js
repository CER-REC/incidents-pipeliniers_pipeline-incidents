const Immutable = require('immutable')

const defaults = Immutable.fromJS({
  isStarted:false,
  columnName: null,
  categoryName: null,
  oldY:null,
  newY:null,
  offset:null
})

const CategoryDragReducer = (state = defaults, action) => {
  switch(action.type) {

  case 'DragCategory':
    return state.merge(action)

  case 'DragCategoryStarted':
    return state.merge(action)

  case 'DragCategoryEnded':
    return state.merge(action)

  default:
    return state
  }
}


module.exports = CategoryDragReducer