
function AddColumnAtPositionCreator (columnName, oldX, newX, viewport) {
  return {
    type: 'AddColumnAtPosition',
    columnName: columnName,
    oldX: oldX, 
    newX: newX,
    viewport: viewport,
  }
}

export default AddColumnAtPositionCreator