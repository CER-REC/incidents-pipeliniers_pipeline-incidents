function CategoryHoverStateCreator (data, columnName, category) {
  return {
    type: 'CategoryHoverState',
    data: data,
    columnName: columnName,
    category: category,
  }
}

module.exports = CategoryHoverStateCreator