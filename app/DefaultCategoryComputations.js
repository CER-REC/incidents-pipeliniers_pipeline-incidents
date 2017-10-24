const Immutable = require('immutable')
const _ = require('lodash')
const MemoizeImmutable = require('memoize-immutable')

const Constants = require('./Constants.js')
const CategoryConstants = require('./CategoryConstants.js')
const IncidentComputations = require('./IncidentComputations.js')



const DefaultCategoryComputations = {

  initialState: function (data, schema, language) {

    let unsortedCategories
    switch (Constants.get('dataMode')) {
    case 'dataService': 
      unsortedCategories = DefaultCategoryComputations.initialStateFromCategorySchema(data, schema)
      break
    case 'csvFile': 
      unsortedCategories = DefaultCategoryComputations.initialStateFromCsv(data)
      break
    }

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


  initialStateFromCsv: function (data) {

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
      case 'volumeCategory': {
        // Most of the columns have a fixed set of categories:

        let activeCategories = Immutable.OrderedMap()

        CategoryConstants.getIn(['dataLoaderCategoryNames', columnName]).forEach( (categoryName, csvHeading) => {
          activeCategories = activeCategories.set(categoryName, true)

        })

        categories = categories.set(columnName, activeCategories)

        break
      }
      case 'company': {
        // Each unique company name constitutes its own category

        const companyNames = data.map( incident => {
          return incident.get('company')
        }).toArray()

        const uniqueCompanyNames = _.uniq(companyNames)
        // TODO: Need to sort this?

        let activeCategories = Immutable.OrderedMap()

        for(const companyName of uniqueCompanyNames) {
          activeCategories = activeCategories.set(companyName, true)
        }

        categories = categories.set('company', activeCategories)

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


    // Sort companies alphabetically
    let labels
    if (Constants.get('dataMode') === 'csvFile') {
      // When using csv files as the source, the category keys are the 
      // labels
      labels = sortedCategories.get('company').keySeq()
    }
    else {
      // When using the data service, get the name from the schema for the
      // current language
      labels = schema.get('company').map( names => {
        return names.get(language)
      })
    }
    labels = labels.sort()
    const sortedCompanies = Immutable.OrderedMap(labels.keySeq().map( name => {
      return [name, true]
    }))
    sortedCategories = sortedCategories.set('company', sortedCompanies)


    // Sort provinces according to a special predefined order
    const provinceOrder = Constants.getIn(['provinceOrder', Constants.get('dataMode')])
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

module.exports = MemoizedComputations