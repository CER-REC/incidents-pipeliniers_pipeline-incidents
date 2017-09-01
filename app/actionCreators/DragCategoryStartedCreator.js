
function DragCategoryStartedCreator (isStarted, columnName, categoryName, oldY, newY, offset) {
  return {
    type: 'DragCategoryStarted',
    isStarted: isStarted,
    columnName: columnName,
    categoryName: categoryName,
    oldY: oldY,
    newY: newY,
    offset: offset
  }
}

module.exports = DragCategoryStartedCreator