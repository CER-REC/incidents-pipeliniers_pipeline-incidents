const MemoizeImmutable = require('memoize-immutable')

const Constants = require('./Constants.js')

const ColumnComputations = {}



// TODO: Use me in sidebar itself
ColumnComputations.sidebarColumns = function (columns) {
  
  return Constants.get('columnNames').filter( columnName => {
    return !columns.contains(columnName)
  })
  
}







const MemoizedComputations = {}

for (const name of Object.keys(ColumnComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(ColumnComputations[name])
}

module.exports = MemoizedComputations