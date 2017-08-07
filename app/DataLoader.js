const Request = require('client-request/promise')
const D3 = require('d3')
const Moment = require('moment')

const DataLoadedCreator = require('./actionCreators/DataLoadedCreator.js')
const SetInitialCategoryStateCreator = require('./actionCreators/SetInitialCategoryStateCreator.js')




function parseYesNo (value, record) {
  if (value === 'Yes' || value === 'yes') {
    return true
  } else if (value === 'No' || (value === '')) {
    // For older incidents, the 'is pipeline system component involved' field is
    // empty. We're interpret this to mean 'no'.
    return false
  }
  else {
    console.warn('Error parsing yes/no value. Value "', value, '" Record:', record)
  }
}

// TODO: This function requires that there be no space after the comma sparating
// values in a list of items. The export tool was including commas at last run,
// ensure that the production export tool is altered to not do this.
// At last writing, this affected the incident types, why it happened, and what 
// happened columns. It didn't affect pipeline system components involved
function parseList (value) {
  if (value === '') {
    // Calling string.split on an empty string returns an array containing an
    // empty string, which isn't quite what we want.
    return []
  }
  else {
    return value.split(',')
  }
}

function volumeCategory(record, volumeString) {

  if (volumeString === 'Not Applicable' || volumeString === 'Not Provided') {
    return volumeString
  }

  const volume = parseFloat(volumeString)
  
  if (isNaN(volume) || volume < 0) {
    console.warn('Bad numeric volume for incident record', record)
    return 'Not Provided'
  }

  if (volume < 1) {
    return 'Less Than 1 m³'
  }
  else if (volume < 1000) {
    return '1 m³ to 1,000 m³'
  } 
  else if (volume < 1000000) {
    return '1,000 m³ to 1,000,000 m³'
  }
  else {
    return 'More than 1,000,000 m³'
  }

}


// Map from the column names to a friendlier internal format
function csvColumnMapping (d) {

  return {
    incidentNumber: d['Incident Number'],
    incidentTypes: parseList(d['Incident Types']),
    reportedDate: Moment(d['Reported Date'], 'DD-MM-YYYY'),
    nearestPopulatedCentre: d['Nearest Populated Centre'],
    province: d['Province'],
    company: d['Company'],
    status: d['Status'],
    latitude: d['Latitude'],
    longitude: d['Longitude'],
    affectsCompanyProperty: parseYesNo(d['Affects Company Property'], d),
    offCompanyProperty: parseYesNo(d['Off Company Property'], d),
    affectsPipelineRightOfWay: parseYesNo(d['Affects Pipeline right-of-way'], d),
    affectsOffPipelineRightOfWay: parseYesNo(d['Affects off Pipeline right-of-way'], d),
    approximateVolumeReleased: d['Approximate Volume Released (m3)'],
    volumeCategory: volumeCategory(d, d['Approximate Volume Released (m3)']),
    substance: d['Substance'],
    substanceCategory: d['SubstanceCategory'],
    releaseType: d['Release Type'],
    year: d['Year'],
    whatHappened: parseList(d['What Happened?']),
    whyItHappened: parseList(d['Why it Happened?']),
    pipelinePhase: d['Pipeline Phase'],
    werePipelineSystemComponentsInvolved: parseYesNo(d['Were Pipeline System Components Involved?'], d),
    pipelineSystemComponentsInvolved: parseList(d['Pipeline System Components Involved']),
  }
}



const DataLoader = {

  // TODO: constant ennumeration of as many of the column vocabularies as
  // possible


  // Load the application data from a single remote CSV file
  loadDataCsv: function (store) {

    const options = {
      uri: `${document.location.protocol}//${document.location.host}${document.location.pathname}data/2017-08-03 2008 - 2017 Incidents data sheet for UofC.csv`,
    }

    Request(options)
      .then(function (response) {
        const data = D3.csvParse(response.body.toString(), csvColumnMapping)
        store.dispatch(DataLoadedCreator(data))

        const state = store.getState(data)
        store.dispatch(SetInitialCategoryStateCreator(state.data))
      })
      .catch(function (error) {
        throw error
      })

  }

  // TODO: in the future, other loader functions will be present for the NEB
  // data service.

}















module.exports = DataLoader

