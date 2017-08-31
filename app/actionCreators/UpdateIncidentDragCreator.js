
function UpdateIncidentDragCreator(columnName, categoryName) {
  return {
    type: 'UpdateIncidentDrag',
    columnName: columnName,
    categoryName: categoryName
  }
}


module.exports = UpdateIncidentDragCreator