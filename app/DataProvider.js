const Promise = require('bluebird')
const Request = require('client-request/promise')
const D3 = require('d3')
const Moment = require('moment')





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



class DataProvider {

  /*
  TODO:
    provider method(s) ... like what?
    constant ennumeration of as many of the column vocabularies as possible
  */

  constructor() {
    // TODO: should the data be stored as an Immutable.js object?
    this.data = null
  }






  // Load the application data from a single remote CSV file
  loadDataCsv() {

    const options = {
      uri: `${document.location.protocol}//${document.location.host}${document.location.pathname}data/2017-08-03 2008 - 2017 Incidents data sheet for UofC.csv`,
    }

    const self = this

    Request(options)
      .then(function (response) {
        self.data = D3.csvParse(response.body.toString(), csvColumnMapping)
      })
      .catch(function (error) {
        throw error
      })

  }

  // TODO: in the future, other loader methods will be present for the NEB data
  // service.

}















module.exports = DataProvider

