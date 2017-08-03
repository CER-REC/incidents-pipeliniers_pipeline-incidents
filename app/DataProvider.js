const Promise = require('bluebird')
const Request = require('client-request/promise')
const D3 = require('d3')


class DataProvider {

  /*
  TODO:
    provider method(s) ... like what?
    constant ennumeration of as many of the column vocabularies as possible
  */

  constructor() {

  }


  // Map from the column names to a friendlier internal format
  csvColumnMapping(d) {

    return {
      incidentNumber: d['Incident Number'],
      incidentTypes: d['Incident Types'], // TODO: dmake list
      reportedDate: d['Reported Date'], // TODO: dmake date?
      nearestPopulatedCentre: d['Nearest Populated Centre'],
      province: d['Province'],
      company: d['Company'],
      status: d['Status'],
      latitude: d['Latitude'],
      longitude: d['Longitude'],
      affectsCompanyProperty: d['Affects Company Property'],
      offCompanyProperty: d['Off Company Property'],
      affectsPipelineRightOfWay: d['Affects Pipeline right-of-way'],
      affectsOffPipelineRightOfWay: d['Affects off Pipeline right-of-way'],
      approximateVolumeReleased: d['Approximate Volume Released (m3)'],
      substance: d['Substance'],
      substanceCategory: d['SubstanceCategory'],
      releaseType: d['Release Type'],
      year: d['Year'],
      whatHappened: d['What Happened?'], // TODO: dmake list
      whyItHappened: d['Why it Happened?'], // TODO: dmake list
      pipelinePhase: d['Pipeline Phase'],
      werePipelineSystemComponentsInvolved: d['Were Pipeline System Components Involved?'],
      pipelineSystemComponentsInvolved: d['Pipeline System Components Involved'], // TODO make list
    }
  }

  // Load the application data from a single remote CSV file
  loadDataCsv() {

    const options = {
      uri: `${document.location.protocol}//${document.location.host}${document.location.pathname}data/2017-08-03 2008 - 2017 Incidents data sheet for UofC.csv`,
    }

    const self = this

    Request(options)
      .then(function (response) {
        console.log(D3.csvParse(response.body.toString(), self.csvColumnMapping))
      })
      .catch(function (error) {
        console.error(error.message)
      })

  }

  // Load the application data from the interim asp.NET service
  loadDataAspNet() {

  }

  // TODO: the final form of the data load should use the (yet to be built)
  // NEB data warehousing service


}















module.exports = DataProvider

