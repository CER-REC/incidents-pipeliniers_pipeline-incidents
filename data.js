// Script to produce data for open.canada.ca

// Switch this to 'production' once the prod data service is live
process.env.NODE_ENV = 'production'

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

const csvHeaderNamesInOrder_FR = {
  IncidentNumber:'Incidents',
  Latitude:'Latitude',
  Longitude:'Longitude',
  ApproximateVolumeM3:'Volume approx. rejeté',
  ReportedDate:'Date/année du signalement',
  IncidentType_FR_LIST:'Type d’incident',
  IncidentStatus_FR:'État',
  CompanyName_FR:'Société',
  NearestPopulationCenter_FR:'Centre de population le plus près',
  ProvinceName_FR:'Provinces',
  SubstanceName_FR:'Substance',
  ReleaseType_FR:' Type de rejet',
  PipelinePhase_FR:'Étape du cycle de vie',
  WerePipelineSystemComponentsInvolved:'Des composantes du réseau ont-elles été en cause?',
  PipelineComponent_FR_LIST:'Composantes en cause',
  WhatHappened_FR_LIST:'Ce qui s’est passé',
  WhyItHappened_FR_LIST:'Causes',
}

const csvHeaderNamesInOrder_EN = [
  'IncidentNumber',
  'Latitude',
  'Longitude',
  'ApproximateVolumeM3',
  'ReportedDate',
  'ReportedYear',
  'IncidentType_EN_LIST',
  'IncidentStatus_EN',
  'CompanyName_EN',
  'NearestPopulationCenter_EN',
  'ProvinceName_EN',
  'SubstanceName_EN',
  'ReleaseType_EN',
  'PipelinePhase_EN',
  'WerePipelineSystemComponentsInvolved',
  'PipelineComponent_EN_LIST',
  'WhatHappened_EN_LIST',
  'WhyItHappened_EN_LIST',
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

  //Prepend UTF 8 Byte Order Mark during CSV generation so 
  //that programs like Microsft Excel can recognize the encoding
  //and use that encoding while opening the file 
  
  const byteOrderMark = '\ufeff'
  
  //English
  Fs.writeFile('Incident Visualization Data_EN.csv', byteOrderMark + D3.csvFormat(outputData.toJS(), csvHeaderNamesInOrder_EN))
  
  //French
  let dataFields = Object.keys(csvHeaderNamesInOrder_FR)
  const frenchHeader = dataFields.map((index) => csvHeaderNamesInOrder_FR[index])
  Fs.writeFile('Incident Visualization Data_FR.csv', byteOrderMark + D3.csvFormatRows([frenchHeader]
    .concat((outputData.toJS()).map(function(d) {
      return dataFields.map((dataFieldName)=> {
        return d[dataFieldName]
      })
    })))
  )
  
  //Combine
  Fs.writeFile('Incident Visualization Data.csv', byteOrderMark + D3.csvFormat(outputData.toJS(), csvHeaderNamesInOrder))
})