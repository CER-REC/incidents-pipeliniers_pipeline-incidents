
function RemoveColumnCreator (columnName) {
  return {
    type: 'RemoveColumn',
    columnName: columnName,
  }
}

export default RemoveColumnCreator