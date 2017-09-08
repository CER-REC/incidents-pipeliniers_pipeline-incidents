
function SnapCategoryCreator (columnName, categoryName, oldY, newY, categoryHeights) {
  return {
    type: 'SnapCategory',
    columnName: columnName,
    categoryName: categoryName,
    oldY: oldY,
    newY: newY,
    categoryHeights: categoryHeights
  }
}

module.exports = SnapCategoryCreator