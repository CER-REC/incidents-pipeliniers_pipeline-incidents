
function AddColumnCreator (columnName) {
  return {
    type: 'AddColumn',
    columnName: columnName,
  }
}

module.exports = AddColumnCreator