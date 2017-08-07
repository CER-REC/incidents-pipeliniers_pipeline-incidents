const Chroma = require('chroma-js')
const Immutable = require('immutable')

const Constants = require('./Constants.js')

const CategoryComputations = {}

// data: the incident data from the store
// categories: the category display data from the store
CategoryComputations.itemsInColumn = function (data, categories, columnName) {

  return categories
    .get(columnName)
    .filter( present => present === true)
    .map( (present, categoryName) => {
      return CategoryComputations.itemsInCategory(data, columnName, categoryName)
    } )
    .reduce( (sum, count) => {return sum + count}, 0)

}

// data: the incident data from the store
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

// data: the incident data from the store
CategoryComputations.itemsInSimpleCategory = function (data, columnName, categoryName) {
  
  return data.filter( item => {
    return item.get(columnName) === categoryName
  }).count()
  
}

// data: the incident data from the store
CategoryComputations.itemsInMultipleCategory = function (data, columnName, categoryName) {

  return data.filter( item => {
    return item.get(columnName).contains(categoryName)
  }).count()

}


// data: the incident data from the store
CategoryComputations.itemsInReportedDateCategory = function (data, categoryName) {

  return data.filter( item => {
    return item.get('reportedDate').year() === categoryName
  }).count()

}

// Returns a map of category names to Chroma colours
// categories: the category display data from the store
CategoryComputations.coloursForColumn = function (categories, columnName) {
  const categoryInfo = categories.get(columnName)
  const colourInfo = Constants.getIn(['columnBaseColors', columnName])
  
  const chromaColours = Chroma.scale([
    colourInfo.get('start'),
    colourInfo.get('middle'),
    colourInfo.get('end'),
  ]).mode('lab').colors(categoryInfo.count())

  return Immutable.Map(categoryInfo.keySeq().zip(chromaColours))

}

window.cc = CategoryComputations
module.exports = CategoryComputations