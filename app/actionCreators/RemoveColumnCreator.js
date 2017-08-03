
function RemoveColumnCreator (columnName) {
  return {
    type: 'RemoveColumn',
    columnName: columnName,
  }
}

module.exports = RemoveColumnCreator