const Immutable = require('immutable')

const defaults = Immutable.fromJS({
  columnName: null,
  itemOverview: null,
})

const ColumnTooltipDetailClickReducer = (state = defaults, action) => {
  switch(action.type) {

  case 'ColumnTooltipDetailClick':
  {
    if(action.columnName === state.get('columnName') &&
      action.itemOverview === state.get('itemOverview')) {
      return state.merge({columnName:null, itemOverview:null})
    }
    return state.merge({columnName:action.columnName, itemOverview:action.itemOverview})
  }

  default:
    return state
  }
}

module.exports = ColumnTooltipDetailClickReducer