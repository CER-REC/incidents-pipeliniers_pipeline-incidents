const Immutable = require('immutable')

const defaults = Immutable.fromJS({
  isStarted:false,
  columnName: null,
  oldX:null,
  newX:null,
  offset:null
})

const SidebarColumnDragReducer = (state = defaults, action) => {
  switch(action.type) {

  case 'DragSidebarColumn':
    return state.merge(action)

  case 'DragSidebarColumnStarted':
    return state.merge(action)

  case 'DragSidebarColumnEnded':
    return state.merge(action)

  default:
    return state
  }
}


module.exports = SidebarColumnDragReducer