// Script to produce data for open.canada.ca

// Switch this to 'production' once the prod data service is live
process.env.NODE_ENV = 'development'

// NB: this list omits elements which are not used by the visualization, and
// which are not really of interest to end uers such as database IDs.
const csvHeaderNamesInOrder = [
  'IncidentNumber',
  'Latitude',
  'Longitude',
  'ApproximateVolumeM3',
  'ReportedDate',
  'ReportedYear',
  'IncidentType_EN_LIST',
  'IncidentType_FR_LIST',
  'IncidentStatus_EN',
  'IncidentStatus_FR',
  'CompanyName_EN',
  'CompanyName_FR',
  'NearestPopulationCenter_EN',
  'NearestPopulationCenter_FR',
  'ProvinceName_EN',
  'ProvinceName_FR',
  'SubstanceName_EN',
  'SubstanceName_FR',
  'ReleaseType_EN',
  'ReleaseType_FR',
  'PipelinePhase_EN',
  'PipelinePhase_FR',
  'WerePipelineSystemComponentsInvolved',
  'PipelineComponent_EN_LIST',
  'PipelineComponent_FR_LIST',
  'WhatHappened_EN_LIST',
  'WhatHappened_FR_LIST',
  'WhyItHappened_EN_LIST',
  'WhyItHappened_FR_LIST',
]


const Fs = require('fs')
const D3 = require('d3')

const DataLoader = require('./app/DataLoader.js')
const Store = require('./app/Store.js')


const store = Store()

let location
if (process.env.NODE_ENV === 'development') {
  location = {
    origin: 'http://localhost:3001',
    pathname: '/pipeline-incidents/',
  }
}
else if (process.env.NODE_ENV === 'production') {
  location = {
    origin: 'https://apps2.neb-one.gc.ca',
    pathname: '/pipeline-incidents/',
  }
}


const dataLoadPromise = DataLoader.loadFromDataService(store, location)

dataLoadPromise.then( () => {

  const outputData = store.getState().data.map( incident => incident.get('originalData'))

  Fs.writeFile('Incident Visualization Data.csv', D3.csvFormat(outputData.toJS(), csvHeaderNamesInOrder))
})