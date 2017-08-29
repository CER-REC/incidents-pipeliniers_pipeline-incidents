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
    .filter( visible => visible === true)
    .map( (visible, categoryName) => {
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

CategoryComputations.itemsInBothCategories = function (data, homeColumnName, homeCategoryName, awayColumnName, awayCategoryName) {
  return data.filter( item => {
    return CategoryComputations.itemInCategory(item, homeColumnName, homeCategoryName) &&
           CategoryComputations.itemInCategory(item, awayColumnName, awayCategoryName)
  }).count()
}

CategoryComputations.itemInCategory = function(item, columnName, categoryName) {
  switch (columnName) {
  // Four of the columns have 'multiple selections', where an item can belong
  // to more than one category at once. These need different handling ... 
  case 'incidentTypes':
  case 'pipelineSystemComponentsInvolved':
  case 'whatHappened':
  case 'whyItHappened':
    return item.get(columnName).contains(categoryName)

  // TODO: better to spell out the other column names explicitly ...
  default:
    return item.get(columnName) === categoryName
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


// For the given column name, return a map of categories which are both visible
// and empty (based on the categories which have been filtered out by the user).

// data: the incident data from the store
// columns: the list of columns on display, from the store
// categories: the category display data from the store
CategoryComputations.emptyCategoriesForColumn = function(data, columns, categories, columnName) {

  const filteredData = IncidentComputations.filteredIncidents(data, columns, categories)

  // TODO: We will only count categories which are visible as being empty
  // Is this a design problem? if a category is empty, and hidden, is it
  // possible to get the category back on display? 
  // If the 'reset' button is added to the show/hide box for the category, then
  // this will need to be revisited, as it may never be possible to access that
  // box unless the category is shown somewhere!
  const visibleCategoryInfo = categories.get(columnName).filter( visible => {
    return visible === true
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
    return visibleCategoryInfo.filter( (visible, categoryName) => {
      const result = filteredData.find( item => {
        return item.get(columnName) === categoryName
      })

      // If we do not find a result, the category is empty, return true
      // If we find a result, the category is not empty, return false
      return typeof result === 'undefined'

    })

  }

  case 'incidentTypes':
  case 'whatHappened':
  case 'whyItHappened':
  case 'pipelineSystemComponentsInvolved': {
    return visibleCategoryInfo.filter( (visible, categoryName) => {
      const result = filteredData.find( item => {
        return item.get(columnName).contains(categoryName)
      })

      // If we do not find a result, the category is empty, return true
      // If we find a result, the category is not empty, return false
      return typeof result === 'undefined'

    })

  }


  case 'map':
    // No categories for map, so it's always empty
    return Immutable.Map()

  }

}



// For the columns which have multiple categories, an incident may have one
// category that is hidden and another that is not.
// In that case, each hidden category is called a 'related hidden category',
// and these are not fully hidden: we show a reduced height box in its place.

// This function returns a map of {categoryName: true} for each related hidden
// category in the given column. 

CategoryComputations.relatedHiddenCategories = function (data, columns, categories, columnName) {

  switch(columnName) {

  case 'year':
  case 'company':
  case 'status':
  case 'province':
  case 'substance':
  case 'releaseType':
  case 'pipelinePhase':
  case 'volumeCategory':
  case 'substanceCategory':
  case 'map':
    // These columns will never have related hidden categories, each incident is
    // only in one category at a time
    return Immutable.Map()

  case 'incidentTypes':
  case 'whatHappened':
  case 'whyItHappened':
  case 'pipelineSystemComponentsInvolved': {

    const filteredData = IncidentComputations.filteredIncidents(data, columns, categories)

    return categories.get(columnName)
      // Only a category which is hidden can potentially be a related hidden
      // category.
      .filter( visible => visible === false )
      .filter( (visible, categoryName) => {

        // Find an incident with the hidden category in the set of displayed
        // incidents. If such an incident exists, we are a hidden related
        // category

        const foundItem = filteredData.find( item => {
          return item.get(columnName).contains(categoryName)
        })

        return typeof foundItem !== 'undefined'

      }).map ( () => {
        // Kind of silly, but the mapped values are each false, makes more sense
        // for them to be true
        return true
      })

  }

  }

}



// Merges the visible categories and related hidden categories for a column, to
// form the full set of categories which should be displayed above the baseline.
// We filter out the categories which are not displayed.

CategoryComputations.displayedCategories = function (data, columns, categories, columnName) {

  const emptyCategoriesForColumn = CategoryComputations.emptyCategoriesForColumn(data, columns, categories, columnName)

  const relatedHiddenCategories = CategoryComputations.relatedHiddenCategories(data, columns, categories, columnName)

  // We need to accomplish several things here:
  // - Columns which are empty should not be displayed (above the baseline for
  //   the column, at any rate)
  // - Columns which are not visible should not be displayed
  // - Columns which are not visible but which are a related hidden category
  //   SHOULD be displayed

  /* 
  In more detail, to help me get this logic right: 
  RHC = related hidden category

  visible, empty, not RHC: not shown
  visible, not empty, RHC: shown in full
  visible, not empty, not RHC: shown in full
  
  not visible, empty, not RHC: not shown
  not visible, not empty, RHC: shown as RHC
  not visible, not empty, not RHC: not shown

  visible, empty, RHC: impossible, can't be empty and RHC
  not visible, empty, RHC: impossible, can't be empty and RHC
  */

  // TODO: I'm STILL not 100% confident I have this logic correct

  return categories.get(columnName)
    .map( (visible, categoryName) => {
      const isEmpty = typeof emptyCategoriesForColumn.get(categoryName) !== 'undefined'

      if (isEmpty) {
        return false
      }

      if (visible) {
        return true
      }
      else {
        const isRelatedHiddenCategory = relatedHiddenCategories.get(categoryName)
        return isRelatedHiddenCategory
      }

    })
    .filter( visible => visible === true )

}


// Returns true or false: are any categories filtered on this column?
CategoryComputations.columnFiltered = function(categories, columnName) {
  const result = categories.get(columnName).find( visible => {
    return visible === false
  })

  return typeof result !== 'undefined'
}



// Returns an object with two keys, left and right, each with the name of
// a column adjacent to the map column.
// Either left or right may be null if the map is at one end of the display
// Both will be null if the map is not on display.
CategoryComputations.mapAdjacentColumns = function(columns) {
  if (!columns.contains('map')) {
    return Immutable.Map({
      left: null,
      right: null,
    })
  }

  // When the map is not present this returns undefined, and the map we
  // return should have null for left and right.
  const index = columns.indexOf('map')

  // Negative indexes will actually index from the end of the list, so this
  // is necessary.
  let left
  if (index === 0) {
    left = null 
  }
  else {
    left = columns.get(index - 1)
  }

  return Immutable.Map({
    left: left || null,
    right: columns.get(index + 1) || null,
  })

}

// Computes the source and destination category paths in place, given
// a source and a destination column.
CategoryComputations.ComputeSourceAndDestinationColumnPaths = function(sourceColumn, destinationColumn, data) {
  sourceColumn.categories.forEach((sourceCategory) => {
    destinationColumn.categories.forEach((destinationCategory) => {
      const mutualIncidentCount = CategoryComputations.itemsInBothCategories(
        data, 
        sourceColumn.name, 
        sourceCategory.categoryName, 
        destinationColumn.name, destinationCategory.categoryName)

      if(mutualIncidentCount !== 0) {
        sourceCategory.totalOutgoingIncidents += mutualIncidentCount
        destinationCategory.totalIncomingIncidents += mutualIncidentCount

        sourceCategory.outgoingCategories.push({'key': destinationCategory.key, 'mutualIncidentCount': mutualIncidentCount})
        destinationCategory.incomingCategories.push({'key': sourceCategory.key, 'mutualIncidentCount': mutualIncidentCount})
      }

      const multipleDestinationCategoryIncidents = (destinationCategory.totalIncomingIncidents > destinationCategory.count)? 
        destinationCategory.totalIncomingIncidents - 
        destinationCategory.count : 0
      destinationCategory.intersectionThreshold = multipleDestinationCategoryIncidents / 
        (destinationCategory.incomingCategories.length - 1) * 
        destinationCategory.height / destinationCategory.count

      const multipeSourceCategoryIncidents = (sourceCategory.totalOutgoingIncidents > sourceCategory.count)? 
        sourceCategory.totalOutgoingIncidents - 
        sourceCategory.count : 0
      sourceCategory.intersectionThreshold = multipeSourceCategoryIncidents / 
        (sourceCategory.outgoingCategories.length - 1) * 
        sourceCategory.height / sourceCategory.count
    })
  })
}


const MemoizedComputations = {}

for (const name of Object.keys(CategoryComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(CategoryComputations[name])
}

module.exports = MemoizedComputations