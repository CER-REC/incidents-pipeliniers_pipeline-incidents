
function ActivateFilterboxCreator(columnName, categoryName) {
  return {
    type: 'ActivateFilterbox',
    columnName: columnName,
    categoryName: categoryName
  }
}


module.exports = ActivateFilterboxCreator