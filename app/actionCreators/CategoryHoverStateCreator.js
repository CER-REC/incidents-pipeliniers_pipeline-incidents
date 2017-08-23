function CategoryHoverStateCreator (columnNames, categoryNames) {
  return {
    type: 'CategoryHoverState',
    columnNames: columnNames,
    categoryNames: categoryNames,
  }
}

module.exports = CategoryHoverStateCreator