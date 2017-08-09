
function SetColumnsToCreator (columnNames) {
  return {
    type: 'SetColumnsTo',
    columnNames: columnNames,
  }
}

module.exports = SetColumnsToCreator