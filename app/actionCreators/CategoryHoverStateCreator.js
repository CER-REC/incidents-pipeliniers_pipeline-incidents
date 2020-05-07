function CategoryHoverStateCreator (columnName, categoryName) {
  return {
    type: 'CategoryHoverState',
    columnName: columnName,
    categoryName: categoryName,
  }
}

export default CategoryHoverStateCreator