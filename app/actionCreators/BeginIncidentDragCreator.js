
function BeginIncidentDragCreator(columnName, categoryName) {
  return {
    type: 'BeginIncidentDrag',
    columnName: columnName,
    categoryName: categoryName
  }
}


module.exports = BeginIncidentDragCreator