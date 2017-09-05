
function DeactivateAllCategoriesExceptOneCreator(columnName, categoryName) {
  return {
    type: 'DeactivateAllCategoriesExceptOne',
    columnName: columnName,
    categoryName: categoryName,
  }
}


module.exports = DeactivateAllCategoriesExceptOneCreator