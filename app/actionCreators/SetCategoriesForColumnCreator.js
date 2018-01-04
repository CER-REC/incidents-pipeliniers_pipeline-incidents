

const SetCategoriesForColumnCreator = function (columnName, categories) {
  return {
    type: 'SetCategoriesForColumn',
    columnName: columnName,
    categories: categories,
  }
}

module.exports = SetCategoriesForColumnCreator