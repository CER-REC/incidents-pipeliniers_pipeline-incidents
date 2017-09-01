
function DeactivateCategoryCreator(columnName, categoryName) {
  return {
    type: 'DeactivateCategory',
    columnName: columnName,
    categoryName: categoryName,
  }
}


module.exports = DeactivateCategoryCreator