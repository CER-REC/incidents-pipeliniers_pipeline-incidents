const CategoryComputations = {}

CategoryComputations.itemsInColumn = function (data, categories, columnName) {

  return categories
    .get(columnName)
    .filter( present => present === true)
    .map( (present, categoryName) => {
      return CategoryComputations.itemsInCategory(data, columnName, categoryName)
    } )
    .reduce( (sum, count) => {return sum + count}, 0)

}

CategoryComputations.itemsInCategory = function (data, columnName, categoryName) {

  switch (columnName) {

  // Four of the columns have 'multiple selections', where an item can belong
  // to more than one category at once. These need different handling ... 
  case 'incidentTypes':
  case 'pipelineSystemComponentsInvolved':
  case 'whatHappened':
  case 'whyItHappened':
    return CategoryComputations.itemsInMultipleCategory(data, columnName, categoryName)

  case 'reportedDate':
    return CategoryComputations.itemsInReportedDateCategory(data, categoryName)

  default: 
    return CategoryComputations.itemsInSimpleCategory(data, columnName, categoryName)
  }

}

CategoryComputations.itemsInSimpleCategory = function (data, columnName, categoryName) {
  
  return data.filter( item => {
    return item.get(columnName) === categoryName
  }).count()
  
}

CategoryComputations.itemsInMultipleCategory = function (data, columnName, categoryName) {

  return data.filter( item => {
    return item.get(columnName).contains(categoryName)
  }).count()

}


CategoryComputations.itemsInReportedDateCategory = function (data, categoryName) {

  return data.filter( item => {
    return item.get('reportedDate').year() === categoryName
  }).count()

}


module.exports = CategoryComputations