import Immutable from 'immutable'

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
    return state.set('newX', action.newX)

  case 'DragSidebarColumnStarted':
    return state.set('isStarted', action.isStarted)
      .set('columnName', action.columnName)
      .set('oldX', action.oldX)
      .set('newX', action.newX)
      .set('offset', action.offset)

  case 'DragSidebarColumnEnded':
    return state.set('isStarted', action.isStarted)

  default:
    return state
  }
}


export default SidebarColumnDragReducer