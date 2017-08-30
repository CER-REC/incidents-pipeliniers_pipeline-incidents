
function AddColumnAtPositionCreator (columnName, oldX, newX) {
  return {
    type: 'AddColumnAtPosition',
    columnName: columnName,
    oldX: oldX, 
    newX: newX
  }
}

module.exports = AddColumnAtPositionCreator