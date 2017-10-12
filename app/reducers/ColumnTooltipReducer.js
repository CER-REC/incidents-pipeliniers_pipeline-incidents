const Immutable = require('immutable')

const defaults = Immutable.fromJS({
  isActive:false,
  columnName: null,
})

const ColumnTooltipReducer = (state = defaults, action) => {
  switch(action.type) {

  case 'ColumnTooltipSummoned':
    return state.merge({isActive:true, columnName: action.columnName})

  case 'ColumnTooltipDismissed':
    return state.merge({isActive:false, storyID: null})

  case 'PopupDismissed':
    return state.merge({isActive:false, storyID: null})

  default:
    return state
  }
}


module.exports = ColumnTooltipReducer