import MemoizeImmutable from 'memoize-immutable'
import Immutable from 'immutable'

const IncidentComputations = {}



// Returns a subset of data, the list of incidents actually on display
// The filter settings (e.g. which categories are enabled) for columns which are
// not displayed are ignored

// data: the incident data from the store
// columns: the list of columns on display, from the store
// categories: the category display data from the store
IncidentComputations.filteredIncidents = function (data, columns, categories) {


  return columns.reduce( (filteredData, columnName) => {

    const categoryInfo = categories.get(columnName)

    return filteredData.filter( item => {

      switch(columnName) {

      // The single attribute columns are simple to filter, only keep the
      // incident if the category settings include the category it falls into
      case 'company':
        return categoryInfo.get(item.get('company')) === true
      case 'status':
        return categoryInfo.get(item.get('status')) === true
      case 'province':
        return categoryInfo.get(item.get('province')) === true
      case 'substance':
        return categoryInfo.get(item.get('substance')) === true
      case 'releaseType':
        return categoryInfo.get(item.get('releaseType')) === true
      case 'pipelinePhase':
        return categoryInfo.get(item.get('pipelinePhase')) === true
      case 'volumeCategory':
        return categoryInfo.get(item.get('volumeCategory')) === true
      case 'year':
        return categoryInfo.get(item.get('year')) === true


      // The multiple category columns are more complex
      // If any of the categories are on display, then the item is shown

      // TODO: Making function objects so deeply in this loop may be a bad
      // idea for performance!

      case 'incidentTypes': {
        let displayed = false
        item.get('incidentTypes').forEach( incidentType => {
          if (categoryInfo.get(incidentType) === true) {
            displayed = true
          }
        })
        return displayed
      }
      case 'whatHappened': {
        let displayed = false
        item.get('whatHappened').forEach( what => {
          if (categoryInfo.get(what) === true) {
            displayed = true
          }
        })
        return displayed
      }
      case 'whyItHappened': {
        let displayed = false
        item.get('whyItHappened').forEach( why => {
          if (categoryInfo.get(why) === true) {
            displayed = true
          }
        })

        return displayed
      }

      case 'pipelineSystemComponentsInvolved': {
        // Uniquely, many incidents have no pipeline components, e.g. they have
        // an empty list for this attribute. This has two unusual consequences:
        // - the incident does not appear in the pipeline components column
        // - the incident cannot be filtered out by the category settings for
        //   the pipeline components column
        const components = item.get('pipelineSystemComponentsInvolved')

        if (components.count() === 0) {
          return true
        }

        let displayed = false
        components.forEach( component => {
          if (categoryInfo.get(component) === true) {
            displayed = true
          }
        })
        return displayed
      }

      case 'map':
        // No categories for map, so we don't filter any items
        return true
      }


    })

  }, data)


}


// Returns a subset of the given list of data, containing only elements in the
// given category.
// NB: Most of the time, 'data' should not be the full set of data in the 
// visualization but the results of a call to filteredIncidents.
IncidentComputations.categorySubset = function(data, columnName, categoryName) {

  switch (columnName) {

  case 'year':
  case 'company':
  case 'status':
  case 'province':
  case 'substance':
  case 'releaseType':
  case 'pipelinePhase':
  case 'volumeCategory':
    // For the single selection columns
    return data.filter( item => {
      return item.get(columnName) === categoryName
    })

  case 'incidentTypes':
  case 'whatHappened':
  case 'whyItHappened':
  case 'pipelineSystemComponentsInvolved':
    // For the multiple selection columns
    return data.filter( item => {
      return item.get(columnName).contains(categoryName)
    })

  case 'map':
    // This should never happen, but
    return Immutable.List()
  }

}


// Returns the name of the [first] category the incident belongs to in the 
// first column in the workspace.
IncidentComputations.firstCategoryName = function(columns, incident) {
  // Handle the case when there are no columns on display in
  // the workspace.
  if(columns.count() === 0) return null
  let categoryName = ''
  switch (columns.get(0)) {
  // Four of the columns have 'multiple selections', where an item can belong
  // to more than one category at once. These need different handling ... 
  case 'incidentTypes':
  case 'pipelineSystemComponentsInvolved':
  case 'whatHappened':
  case 'whyItHappened':
    categoryName = incident.get(columns.get(0)).get(0)
    if(categoryName === undefined) return null
    return categoryName

  default: 
    categoryName = incident.get(columns.get(0))
    if(categoryName === undefined) return null
    return categoryName
  }
}



// Returns a list of incidents which are included in the current category
// selection.
// When the user is hovering a category, that is considered to be the current
// selection. When the user is not hovering anything, if a filterbox has been
// activated, then this is considered to be the current selection

// data: the filtered incidents
// categoryHoverState: from the store
// filterboxActivationState: from the store

IncidentComputations.incidentsInCategorySelection = function (data, categoryHoverState, filterboxActivationState) {

  if (categoryHoverState.get('columnName') !== null && 
    categoryHoverState.get('categoryName') !== null) {

    return IncidentComputations.categorySubset(
      data,
      categoryHoverState.get('columnName'),
      categoryHoverState.get('categoryName')
    )

  }
  else if (filterboxActivationState.get('columnName') !== null && 
    filterboxActivationState.get('categoryName') !== null){

    return IncidentComputations.categorySubset(
      data,
      filterboxActivationState.get('columnName'),
      filterboxActivationState.get('categoryName')
    )

  }
  else {
    return null
  }


}



const MemoizedComputations = {}

for (const name of Object.keys(IncidentComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(IncidentComputations[name])
}

export default MemoizedComputations