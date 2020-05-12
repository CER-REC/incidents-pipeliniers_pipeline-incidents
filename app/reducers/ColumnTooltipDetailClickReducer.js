import Immutable from 'immutable'

const defaults = Immutable.fromJS({
  columnName: null,
  itemOverview: null,
})

const ColumnTooltipDetailClickReducer = (state = defaults, action) => {
  switch(action.type) {

  case 'ColumnTooltipDetailExpand':
    return state.merge({columnName:action.columnName, itemOverview:action.itemOverview})

  case 'ColumnTooltipDetailCollapse':
    return state.merge({columnName:null, itemOverview:null})

  case 'PopupDismissed':
    return state.merge({columnName:null, itemOverview:null})  

  default:
    return state
  }
}

export default ColumnTooltipDetailClickReducer