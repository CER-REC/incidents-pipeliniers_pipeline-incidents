const Immutable = require('immutable')

const defaults = Immutable.fromJS({
  isStarted:false,
  columnName: null,
  oldX:null,
  newX:null,
  offset:null
})

const ColumnDragReducer = (state = defaults, action) => {
  switch(action.type) {

  case 'DragColumn':
    return state.merge(action)

  case 'DragColumnStarted':
    return state.merge(action)

  case 'DragColumnEnded':
    return state.merge(action)

  default:
    return state
  }
}


module.exports = ColumnDragReducer