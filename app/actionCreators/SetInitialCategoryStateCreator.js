const Immutable = require('immutable')
const _ = require('lodash')

const Constants = require('../Constants.js')




function SetInitialCategoryStateCreator (data) {

  let state = Immutable.Map()

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
    case 'substanceCategory':
    case 'pipelineSystemComponentsInvolved':
    case 'volumeCategory': {
      // Eleven of the columns have a fixed set of categories:

      let activeCategories = Immutable.Map()

      Constants.getIn(['categoryNames', columnName]).forEach( categoryName => {
        activeCategories = activeCategories.set(categoryName, true)

      })

      state = state.set(columnName,activeCategories)

      break
    }
    case 'company': {
      // Each unique company name constitutes its own category

      const companyNames = data.map( incident => {
        return incident.get('company')
      }).toArray()

      const uniqueCompanyNames = _.uniq(companyNames)
      // TODO: Need to sort this?

      let activeCategories = Immutable.Map()

      for(const companyName of uniqueCompanyNames) {
        activeCategories = activeCategories.set(companyName, true)
      }

      state = state.set('company', activeCategories)

      break
    }
    case 'reportedDate': {
      // Each year appearing in the dataset will be a category

      const reportedYears = data.map( incident => {
        return incident.get('reportedDate').year()
      }).toArray()

      const uniqueReportedYears = _.uniq(reportedYears)
      // TODO: Need to sort this?

      let activeCategories = Immutable.Map()

      for(const year of uniqueReportedYears) {
        activeCategories = activeCategories.set(year, true)
      }

      state = state.set('reportedDate', activeCategories)

      break
    }
    case 'map': 
      // Uniquely, the map has no categories
      break
    }

  })

  return {
    type: 'SetInitialCategoryState',
    state: state
  }
}

module.exports = SetInitialCategoryStateCreator
