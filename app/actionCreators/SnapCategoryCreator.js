
function SnapCategoryCreator (columnName, categoryName, oldY, newY, viewport) {
  return {
    type: 'SnapCategory',
    columnName: columnName,
    categoryName: categoryName,
    oldY: oldY,
    newY: newY,
    viewport: viewport
  }
}

module.exports = SnapCategoryCreator