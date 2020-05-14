
function DeactivateAllCategoriesExceptOneCreator(columnName, categoryName) {
  return {
    type: 'DeactivateAllCategoriesExceptOne',
    columnName: columnName,
    categoryName: categoryName,
  }
}


export default DeactivateAllCategoriesExceptOneCreator