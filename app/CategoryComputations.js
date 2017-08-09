const Chroma = require('chroma-js')
const Immutable = require('immutable')
const MemoizeImmutable = require('memoize-immutable')

const Constants = require('./Constants.js')
const IncidentComputations = require('./IncidentComputations.js')

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

// Computes the amount of height desired for empty categories, across the entire
// visualization

// TODO: What do we do if there is a huge number of empty categories (like for
// companies) and the height takes too much of the visualization space?

// columns: the list of columns on display, from the store
// data: the incident data from the store
CategoryComputations.desiredEmptyCategoryHeight = function (data, columns, categories) {

  // Calculate how much height is needed for each column, the amount needed
  // overall is the maximum among those heights.

  return CategoryComputations.maxEmptyCategories(data, columns, categories) *
    Constants.get('emptyCategoryHeight')

}


// Return the maximum number of empty categories, across all displayed columns
CategoryComputations.maxEmptyCategories = function (data, columns, categories) {

  return columns.map( columnName => {
    return CategoryComputations.emptyCategoriesForColumn(data, columns, categories, columnName)
  }).reduce( (max, categoryList) => {
    return Math.max(max, categoryList.count())
  }, 0)

}


// For the given column name, return a list of categories which are both visible
// and empty (based on the categories which have been filtered out by the user).

// data: the incident data from the store
// columns: the list of columns on display, from the store
// categories: the category display data from the store
CategoryComputations.emptyCategoriesForColumn = function(data, columns, categories, columnName) {

  // TODO: so, we're filtering the data for every column? DEFINITELY need to
  // consider the performance implications of doing this ... 
  const filteredData = IncidentComputations.filteredIncidents(data, columns, categories)

  // TODO: We will only count categories which are visible as being empty
  // Is this a design problem? if a category is empty, and hidden, is it
  // possible to get the category back on display? 
  // If the 'reset' button is added to the show/hide box for the category, then
  // this will need to be revisited, as it may never be possible to access that
  // box unless the category is shown somewhere!
  const visibleCategoryInfo = categories.get(columnName).filter( present => {
    return present === true
  })

  switch(columnName) {

  case 'company': 
  case 'status':
  case 'province':
  case 'substance':
  case 'releaseType':
  case 'pipelinePhase':
  case 'volumeCategory':
  case 'year': 
  case 'substanceCategory': {
    return visibleCategoryInfo.filter( (present, categoryName) => {
      const result = filteredData.find( item => {
        return item.get(columnName) === categoryName
      })

      // If we do not find a result, the category is empty, return true
      // If we find a result, the category is not empty, return false
      return typeof result === 'undefined'

    // Transform the map of {categoryName: present} to just a sequence of
    // empty category names
    }).keySeq()

  }

  case 'incidentTypes':
  case 'whatHappened':
  case 'whyItHappened':
  case 'pipelineSystemComponentsInvolved': {
    return visibleCategoryInfo.filter( (present, categoryName) => {
      const result = filteredData.find( item => {
        return item.get(columnName).contains(categoryName)
      })

      // If we do not find a result, the category is empty, return true
      // If we find a result, the category is not empty, return false
      return typeof result === 'undefined'

    // Transform the map of {categoryName: present} to just a sequence of
    // empty category names
    }).keySeq()

  }


  case 'map':
    // No categories for map, so it's always empty
    return Immutable.List()

  }

}
















const MemoizedComputations = {}

for (const name of Object.keys(CategoryComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(CategoryComputations[name])
}


module.exports = MemoizedComputations