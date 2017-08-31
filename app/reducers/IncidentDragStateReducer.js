const Immutable = require('immutable')


const defaultState = Immutable.Map({
  currentlyDragging: false,
  columnName: null,
  categoryName: null
})

const IncidentDragStateReducer = (state = defaultState, action) => {

  switch(action.type) {

  case 'BeginIncidentDrag':
    return Immutable.Map({
      currentlyDragging: true,
      columnName: action.columnName,
      categoryName: action.categoryName
    })

  case 'UpdateIncidentDrag':
    return state.set('columnName', action.columnName)
      .set('categoryName', action.categoryName)

  case 'EndIncidentDrag':
    return defaultState

  default:
    return state
  }


}




module.exports = IncidentDragStateReducer

