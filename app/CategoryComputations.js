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

// Computes the amount of height needed for empty categories, across the enire
// visualization

// TODO: What do we do if there is a huge number of empty categories (like for
// companies) and the height takes too much of the visualization space?

// columns: the list of columns on display, from the store
// data: the incident data from the store
CategoryComputations.emptyCategoryHeight = function(columns, data) {

  // Calculate how much height is needed for each column, the amount needed
  // overall is the maximum among those heights.
  return columns.map( columnName => {
    return CategoryComputations.emptyCategoryHeightForColumn(columnName, data)
  }).reduce( (max, height) => {return Math.max(max, height)}, 0)

}


CategoryComputations.emptyCategoryHeightForColumn = function(columnName, data) {

  switch(columnName) {

  case 'reportedDate':
  case 'company':
  case 'status':
  case 'province':
  case 'substance':
  case 'releaseType':
  case 'pipelinePhase':
  case 'volumeCategory':
  case 'substanceCategory':



  case 'incidentTypes':
  case 'whatHappened':
  case 'whyItHappened':
  case 'pipelineSystemComponentsInvolved':



  case 'map':
    // No categories for map, so it's always zero
    return 0

  }

}
















window.cc = CategoryComputations
module.exports = CategoryComputations