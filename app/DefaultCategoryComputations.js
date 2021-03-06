import Immutable from 'immutable'
import _ from 'lodash'
import MemoizeImmutable from 'memoize-immutable'

import Constants from './Constants.js'
import IncidentComputations from './IncidentComputations.js'



const DefaultCategoryComputations = {

  initialState: function (data, schema, language) {

    const unsortedCategories = DefaultCategoryComputations.initialStateFromCategorySchema(data, schema);

    return DefaultCategoryComputations.sortCategories(data, unsortedCategories, schema, language)
  },


  initialStateFromCategorySchema: function (data, schema) {

    let categories = Immutable.Map()

    Constants.get('columnNames').forEach( columnName => {
      // All of the categories default to being active

      switch(columnName){

      case 'incidentTypes':
      case 'status':
      case 'province':
      case 'substance':
      case 'releaseType':
      case 'whatHappened':
      case 'whyItHappened':
      case 'pipelinePhase':
      case 'pipelineSystemComponentsInvolved':
      case 'company':
      case 'volumeCategory': {
        // Most of the columns have a fixed set of categories, including the
        // companies:

        let activeCategories = Immutable.OrderedMap()

        schema.get(columnName).forEach( (value, categoryId) => {
          activeCategories = activeCategories.set(categoryId, true)
        })

        categories = categories.set(columnName, activeCategories)

        break
      }

      case 'year': {
        // Each year appearing in the dataset will be a category

        const reportedYears = data.map( incident => {
          return incident.get('year')
        }).toArray()

        const uniqueReportedYears = _.uniq(reportedYears).sort().reverse()

        let activeCategories = Immutable.OrderedMap()

        for(const year of uniqueReportedYears) {
          activeCategories = activeCategories.set(year, true)
        }

        categories = categories.set('year', activeCategories)

        break
      }

      case 'map': 
        // Uniquely, the map has no categories
        categories = categories.set('map', Immutable.Map())
        break
      }

    })

    return categories


  },

  sortCategories: function (data, unsortedCategories, schema, language) {

    let sortedCategories = unsortedCategories

    // Sort categories in these columns by number of items
    const sizeColumns = [
      'incidentTypes',
      'substance',
      'releaseType',
      'whatHappened',
      'whyItHappened',
      'volumeCategory',
      'pipelineSystemComponentsInvolved',
      'status',
      'pipelinePhase',
    ]
    for (const columnName of sizeColumns) {
      const categoryCountArray = []

      sortedCategories.get(columnName).forEach( (visible, categoryName) => {
        categoryCountArray.push([categoryName, IncidentComputations.categorySubset(data, columnName, categoryName).count()])
      })

      const categoryCounts = Immutable.OrderedMap(categoryCountArray)

      // Sort descending, hence the reverse() call
      // We want a map of categories => visible, not categories => count
      const sorted = categoryCounts.sort().reverse().map( () => true)

      sortedCategories = sortedCategories.set(columnName, sorted)
    }


    // Get the name from the schema for the current language, and sort alphabetically
    const labels = schema.get('company')
      .map(names => names.get(language))
      .sort();
    const sortedCompanies = Immutable.OrderedMap(labels.keySeq().map( name => {
      return [name, true]
    }))
    sortedCategories = sortedCategories.set('company', sortedCompanies)


    // Sort provinces according to a special predefined order
    const provinceOrder = Constants.get('provinceOrder')
    const orderedProvinces = Immutable.OrderedMap(
      provinceOrder.map( provinceName => {
        return [provinceName, true]
      }).toArray()
    )
    sortedCategories = sortedCategories.set('province', orderedProvinces)


    // Sort years chronologically, descending
    let years = sortedCategories.get('year').keySeq()
    years = years.sort().reverse()
    const sorted = Immutable.OrderedMap(years.map( year => [year, true] ))
    sortedCategories.set('year', sorted)


    return sortedCategories

  }

}



const MemoizedComputations = {}

for (const name of Object.keys(DefaultCategoryComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(DefaultCategoryComputations[name])
}

export default MemoizedComputations
