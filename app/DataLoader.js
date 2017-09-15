const Request = require('client-request/promise')
const D3 = require('d3')
const Moment = require('moment')

const DataLoadedCreator = require('./actionCreators/DataLoadedCreator.js')
const SetInitialCategoryStateCreator = require('./actionCreators/SetInitialCategoryStateCreator.js')
const CategoryConstants = require('./CategoryConstants.js')
const RouteComputations = require('./RouteComputations.js')
const SetFromRouterStateCreator = require('./actionCreators/SetFromRouterStateCreator.js')
const DefaultCategoryComputations = require('./DefaultCategoryComputations.js')



function parseYesNo (value, record) {
  if (value === 'Yes' || value === 'yes') {
    return true
  } 
  else if (value === 'No' || (value === '')) {
    // For older incidents, the 'is pipeline system component involved' field is
    // empty. We're interpret this to mean 'no'.
    return false
  }
  else {
    console.warn('Error parsing yes/no value. Value "', value, '" Record:', record)
  }
}

// TODO: This function requires that there be no space after the comma separating
// values in a list of items. The export tool was including commas at last run,
// ensure that the production export tool is altered to not do this.
// At last writing, this affected the incident types, why it happened, and what 
// happened columns. It didn't affect pipeline system components involved
function parseList (record, columnName, value) {
  if (value === '') {
    // Calling string.split on an empty string returns an array containing an
    // empty string, which isn't quite what we want.
    return []
  }
  else {
    const listItems = value.split(',')
    return listItems.map( listItem => {
      const categoryValue = CategoryConstants.getIn(['dataLoaderCategoryNames', columnName, listItem])
        
      if (typeof categoryValue === 'undefined') {
        console.warn(`Error parsing element of list value. Column ${columnName}, Value "${listItem}", Record: `, record)
        // TODO: This kind of error condition could actually lead to crashes
        // or other bad behaviour down the line. Should we upgrade the parser
        // so that it can reject / filter out bad records?
      }
      return categoryValue
    })
  }
}

function volumeCategory(record, volumeString) {

  if (volumeString === 'Not Applicable') {
    return 'notApplicable'
  }
  else if (volumeString === 'Not Provided') {
    return 'notProvided'
  }

  const volume = parseFloat(volumeString)
  
  if (isNaN(volume) || volume < 0) {
    console.warn('Bad numeric volume for incident record', record)
    return 'notProvided'
  }

  if (volume < 1) {
    // 'Less Than 1 m³'
    return 'lessThanOne'
  }
  else if (volume < 1000) {
    // '1 m³ to 1,000 m³'
    return 'lessThanOneThousand'
  } 
  else if (volume < 1000000) {
    // '1,000 m³ to 1,000,000 m³'
    return 'lessThanOneMillion'
  }
  else {
    // 'More than 1,000,000 m³'
    return 'moreThanOneMillion'
  }

}

function readFloat(record, accessor) {

  const float = parseFloat(record[accessor])
  
  if (isNaN(float)) {
    console.warn(`Bad ${accessor} value for incident record`, record)
    // TODO: strictly speaking, there are no good return values to use here
    return 'Not Provided'
  }

  return float

}

// An entry in a record that should belong to a defined vocabulary
// For entries:
// province
// status
// substance
// substanceCategory
// releaseType
// pipelinePhase
function readConstrainedVocabularyString(record, heading, categoryName) {

  const result = CategoryConstants.getIn(['dataLoaderCategoryNames', categoryName, record[heading]])

  if (typeof result === 'undefined') {
    console.warn(`Bad ${categoryName} value ${record[heading]} for incident record`, record)
  }

  return result

}


// Map from the column names to a friendlier internal format
function csvColumnMapping (d) {

  return {
    incidentNumber: d['Incident Number'],
    incidentTypes: parseList(d, 'incidentTypes', d['Incident Types']),
    reportedDate: Moment(d['Reported Date'], 'DD-MM-YYYY'),
    nearestPopulatedCentre: d['Nearest Populated Centre'],
    province: readConstrainedVocabularyString(d, 'Province', 'province'),
    company: d['Company'],
    status: readConstrainedVocabularyString(d, 'Status', 'status'),
    latitude: readFloat(d, 'Latitude'),
    longitude: readFloat(d, 'Longitude'), 
    affectsCompanyProperty: parseYesNo(d['Affects Company Property'], d),
    offCompanyProperty: parseYesNo(d['Off Company Property'], d),
    affectsPipelineRightOfWay: parseYesNo(d['Affects Pipeline right-of-way'], d),
    affectsOffPipelineRightOfWay: parseYesNo(d['Affects off Pipeline right-of-way'], d),
    approximateVolumeReleased: d['Approximate Volume Released (m3)'],
    volumeCategory: volumeCategory(d, d['Approximate Volume Released (m3)']),
    substance: readConstrainedVocabularyString(d, 'Substance', 'substance'),
    substanceCategory: readConstrainedVocabularyString(d, 'SubstanceCategory', 'substanceCategory'),
    releaseType: readConstrainedVocabularyString(d, 'Release Type', 'releaseType'),
    year: d['Year'],
    whatHappened: parseList(d, 'whatHappened', d['What Happened?']),
    whyItHappened: parseList(d, 'whyItHappened', d['Why it Happened?']),
    pipelinePhase: readConstrainedVocabularyString(d, 'Pipeline Phase', 'pipelinePhase'),
    werePipelineSystemComponentsInvolved: parseYesNo(d['Were Pipeline System Components Involved?'], d),
    pipelineSystemComponentsInvolved: parseList(d, 'pipelineSystemComponentsInvolved', d['Pipeline System Components Involved']),
  }
}



const DataLoader = {

  // Load the application data from a single remote CSV file
  loadDataCsv: function (store) {

    const options = {
      uri: `${document.location.protocol}//${document.location.host}${document.location.pathname}data/2017-08-03 2008 - 2017 Incidents data sheet for UofC.csv`,
    }

    Request(options)
      .then(function (response) {
        const data = D3.csvParse(response.body.toString(), csvColumnMapping)
        store.dispatch(DataLoadedCreator(data))

        let state = store.getState()
        const categories = DefaultCategoryComputations.initialState(state.data)

        store.dispatch(SetInitialCategoryStateCreator(categories))

        state = store.getState()
        const routerState = RouteComputations.urlParamsToState(document.location.search, state.data, state.categories)


        store.dispatch(SetFromRouterStateCreator({
          columns: routerState.columns,
          categories: routerState.categories,
          showEmptyCategories: routerState.showEmptyCategories,
          pinnedIncidents: routerState.pinnedIncidents,
          selectedIncident: routerState.selectedIncident,
          language: routerState.language,
        }))




      })
      .catch(function (error) {
        throw error
      })

  }

  // TODO: in the future, other loader functions will be present for the NEB
  // data service.

}















module.exports = DataLoader

