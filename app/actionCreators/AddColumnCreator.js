
function AddColumnCreator (columnName) {
  return {
    type: 'AddColumn',
    columnName: columnName,
  }
}

export default AddColumnCreator