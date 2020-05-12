

const SetCategoriesForColumnCreator = function (columnName, categories) {
  return {
    type: 'SetCategoriesForColumn',
    columnName: columnName,
    categories: categories,
  }
}

export default SetCategoriesForColumnCreator