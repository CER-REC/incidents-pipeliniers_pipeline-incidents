function CategoryHoverStateCreator (columnName, categoryName) {
  return {
    type: 'CategoryHoverState',
    columnName: columnName,
    categoryName: categoryName,
  }
}

module.exports = CategoryHoverStateCreator