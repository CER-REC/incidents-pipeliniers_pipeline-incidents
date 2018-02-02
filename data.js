// Script to produce data for open.canada.ca

// Switch this to 'production' once the prod data service is live
// NB: If the latest data is not available from production, you may need to 
// download it from TEST, put it in a JSON file in public/data, change the
// downloaded data file in RouteComputations to the new JSON file, and change
// this environment setting to 'development'
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

//trKey contains key information for the data stored in translation table 
//trKey: 'not-applicable' is the one whose translation is not available
const csvHeaderNamesInOrder_FR = {
  IncidentNumber: {
    header: 'Incidents',
    trKey: 'not-applicable'
  },
  Latitude: {
    header: 'Latitude',
    trKey: 'not-applicable'
  },
  Longitude:{
    header: 'Longitude',
    trKey: 'not-applicable'
  },
  ApproximateVolumeM3:{
    header: 'Volume approx. rejeté',
    trKey: 'volumeCategory'
  },
  ReportedDate:{
    header: 'Date/année du signalement',
    trKey: 'not-applicable'
  },
  IncidentType_FR_LIST:{
    header: 'Type d’incident',
    trKey: 'incidentTypes'
  },
  IncidentStatus_FR:{
    header: 'État',
    trKey: 'status'
  },
  CompanyName_FR:{
    header: 'Société',
    trKey: 'not-applicable'
  },
  NearestPopulationCenter_FR:{
    header: 'Centre de population le plus près',
    trKey: 'not-applicable'
  },
  ProvinceName_FR:{
    header: 'Provinces',
    trKey: 'province'
  },
  SubstanceName_FR:{
    header: 'Substance',
    trKey: 'substance'
  },
  ReleaseType_FR:{
    header: ' Type de rejet',
    trKey: 'releaseType'
  },
  PipelinePhase_FR:{
    header: 'Étape du cycle de vie',
    trKey: 'pipelinePhase'
  },
  WerePipelineSystemComponentsInvolved:{
    header: 'Des composantes du réseau ont-elles été en cause?',
    trKey: 'pipelineSystemComponentsInvolved'
  },
  PipelineComponent_FR_LIST:{
    header: 'Composantes en cause',
    trKey: 'not-applicable'
  },
  WhatHappened_FR_LIST:{
    header: 'Ce qui s’est passé',
    trKey: 'whatHappened'
  },
  WhyItHappened_FR_LIST:{
    header: 'Causes',
    trKey: 'whyItHappened'
  }
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
const Tr = require('./app/TranslationTable.js')


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
  const frenchHeader = dataFields.map((index) => csvHeaderNamesInOrder_FR[index]['header'])
  Fs.writeFile('Incident Visualization Data_FR.csv', byteOrderMark + D3.csvFormatRows([frenchHeader]
    .concat((outputData.toJS()).map(function(columns) {
      return dataFields.map((dataFieldName)=> {
        let dataValue = columns[dataFieldName]
        const trKey = csvHeaderNamesInOrder_FR[dataFieldName]['trKey']
        if(trKey !== 'not-applicable')
        {
          Tr.getIn(['categories', trKey]).entrySeq().forEach(category => {
            if(dataValue === category[1].get('en')){
              dataValue = category[1].get('fr')
              return
            }
          })
        }
        return dataValue  
      })
    })))
  )
})
