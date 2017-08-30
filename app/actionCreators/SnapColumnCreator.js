
function SnapColumnCreator (columnName, oldX, newX) {
  return {
    type: 'SnapColumn',
    columnName: columnName,
    oldX: oldX,
    newX: newX
  }
}

module.exports = SnapColumnCreator