const Request = require('client-request/promise')
const Moment = require('moment')
const Immutable = require('immutable')
const Promise = require('bluebird')

const DataLoadedCreator = require('./actionCreators/DataLoadedCreator.js')
const SetInitialCategoryStateCreator = require('./actionCreators/SetInitialCategoryStateCreator.js')
const RouteComputations = require('./RouteComputations.js')
const SetFromRouterStateCreator = require('./actionCreators/SetFromRouterStateCreator.js')
const DefaultCategoryComputations = require('./DefaultCategoryComputations.js')
const SetSchemaCreator = require('./actionCreators/SetSchemaCreator.js')

// Returns a promise
function afterLoad (store, data, location) {

  return new Promise( (resolve) => {
    store.dispatch(DataLoadedCreator(data))

    let state = store.getState()
    const categories = DefaultCategoryComputations.initialState(
      state.data,
      state.schema,
      state.language
    )
    store.dispatch(SetInitialCategoryStateCreator(categories))

    state = store.getState()
    const routerState = RouteComputations.urlParamsToState(location, state.data, state.categories)

    store.dispatch(SetFromRouterStateCreator({
      columns: routerState.columns,
      categories: routerState.categories,
      showEmptyCategories: routerState.showEmptyCategories,
      pinnedIncidents: routerState.pinnedIncidents,
      selectedIncidents: routerState.selectedIncidents,
      filterboxActivationState: routerState.filterboxActivationState,
      language: routerState.language,
      screenshotMode: RouteComputations.screenshotMode(location)
    }))

    resolve()
  })
}





function validatePresence (name, incident, errors) {
  if (incident[name] === undefined || incident[name] === null) {
    errors.push({message: `Absent value for ${name}.`, incident: incident, value: incident[name]})
  }
  else {
    return incident[name]
  }
}

function validateNumeric (name, incident, errors) {
  if (isNaN(incident[name])) {
    errors.push({message: `Bad numeric value for ${name}.`, incident: incident, value: incident[name]})
  }
  else {
    return incident[name]
  }
}

function validateIdInSet (name, incident, set, errors) {
  // Within the application, all of our keys are strings, but the service
  // returns JSON numbers
  const value = String(incident[name])
  if (set.get(value) === undefined) {
    errors.push({message: `Value for ${name} not in schema.`, incident: incident, value: incident[name]})
  }
  else {
    return value
  }
}

function validateIdInStatusSet (name, incident, set, errors) {
  // Within the application, all of our keys are strings, but  the service
  // returns JSON numbers
  let value = String(incident[name])
  // We consider incidents which are submitted and which are under review to 
  // both have the same status: submitted
  if (value === '4') {
    value = '3'
  }

  if (set.get(value) === undefined) {
    errors.push({message: `Value for ${name} not in schema.`, incident: incident, value: incident[name]})
  }
  else {
    return value
  }
}

function validateListIdsInSet (name, incident, set, errors) {
  let items
  try {
    items = incident[name].split(',')
  }
  catch (e) {
    errors.push({message: `Absent value for ${name}`, incident: incident, value: incident[name]})
    return
  }

  for (const item of items) {
    if (set.get(item) === undefined) {
      errors.push({message: `List value ${item} for ${name} not in schema.`, incident: incident, value: incident[name]})
      return
    }
  }

  return items
}

function validateBoolean (name, incident, errors) {
  let value
  switch (incident[name]) {
  case 'Yes':
    value = true
    break
  case 'No':
    value = false
    break
  }

  if (value === true || value === false) {
    return value
  }
  else {
    errors.push({message: `Non 'Yes'/'No' value for ${name}`, incident: incident, value: incident[name]})
  }
}

function validateDate (name, incident, errors) {
  const date = Moment(incident[name])

  if (date.isValid()) {
    return date
  } 
  else {
    errors.push({message: `Bad date value for ${name}`, incident: incident, value: incident[name]})
  }
}

function validateVolumeReleased(incident, errors) {

  const volumeString = incident.ApproximateVolumeM3
  if (volumeString === 'Not Applicable' || volumeString === 'Not Provided') {
    return volumeString
  }

  const volume = parseFloat(volumeString)
  
  if (isNaN(volume) || volume < 0) {
    errors.push({message: 'Bad approximate volume value', incident: incident, value: incident.ApproximateVolumeM3})
    return
  }

  return volumeString
}


function validateVolumeCategory(incident, errors) {

  const volumeString = incident.ApproximateVolumeM3

  if (volumeString === 'Not Applicable') {
    return '1'
  }
  else if (volumeString === 'Not Provided') {
    return '2'
  }

  const volume = parseFloat(volumeString)
  
  if (isNaN(volume) || volume < 0) {
    errors.push({message: 'Bad numeric volume', incident: incident, value: incident.ApproximateVolumeM3})
  }

  if (volume < 1) {
    // 'Less Than 1 m³'
    return '3'
  }
  else if (volume < 1000) {
    // '1 m³ to 1,000 m³'
    return '4'
  } 
  else if (volume < 1000000) {
    // '1,000 m³ to 1,000,000 m³'
    return '5'
  }
  else {
    // 'More than 1,000,000 m³'
    return '6'
  }

}




function validateSystemComponentsInvolved (incident, schema, errors) {
  const wereComponentsInvolved = validateBoolean('WerePipelineSystemComponentsInvolved', incident, errors)

  if (incident.PipelineComponent_ID_LIST === '-1') {
    if (wereComponentsInvolved === true) {
      return ['unknown']
    }
    else if (wereComponentsInvolved === false) {
      return ['notApplicable']
    }
  }

  const componentsList = validateListIdsInSet('PipelineComponent_ID_LIST', incident, schema.get('pipelineSystemComponentsInvolved'), errors)

  if (componentsList && componentsList.length > 0) {
    return componentsList
  }
  else if (wereComponentsInvolved === true) {
    return ['unknown']
  }
  else if (wereComponentsInvolved === false) {
    return ['notApplicable']
  }

  else {
    errors.push({message: 'Error parsing system components involved list', incident: incident})
  }

}



const DataLoader = {


  // Load the application data from the data service.
  // Returns a promise
  loadFromDataService (store, location) {

    const appRoot = RouteComputations.appRoot(location, store.getState().language)

    const schemaOptions = {
      uri: `${appRoot}data/CategorySchema.json`,
      json: true
    }

    const schemaPromise = Request(schemaOptions)
      .then( response => {
        const schema = Immutable.fromJS(response.body)
        store.dispatch(SetSchemaCreator(schema))
        return schema
      })


    const dataOptions = {
      uri: RouteComputations.dataServiceEndpoint(location, store.getState().language),
      json: true,
    }

    const dataRequest = Request(dataOptions)

    return Promise.join(schemaPromise, dataRequest)
      .then(function ([schema, dataResponse]) {

        const incidents = [] 

        console.log('Validating incidents: ', dataResponse.body.length)
        for (const incident of dataResponse.body) {

          const errors = []

          const incidentRecord = {
            incidentNumber: validatePresence('IncidentNumber', incident, errors),
            nearestPopulatedCentre: validatePresence('NearestPopulationCenter_EN', incident, errors),

            latitude: validateNumeric('Latitude', incident, errors),
            longitude: validateNumeric('Longitude', incident, errors),

            affectsCompanyProperty: validateBoolean('AffectsCompanyProperty', incident, errors),
            offCompanyProperty: validateBoolean('OffCompanyProperty', incident, errors),
            affectsPipelineRightOfWay: validateBoolean('AffectsPipelineRightOfWay', incident, errors),
            affectsOffPipelineRightOfWay: validateBoolean('AffectsOffPipelineRightOfWay', incident, errors),

            reportedDate: validateDate('ReportedDate', incident, errors),
            year: validatePresence('ReportedYear', incident, errors),

            status: validateIdInStatusSet('IncidentStatus_ID', incident, schema.get('status'), errors),
            company: validateIdInSet('Company_ID', incident, schema.get('company'), errors),
            province: validateIdInSet('Province_ID', incident, schema.get('province'), errors),
            substance: validateIdInSet('Substance_ID', incident, schema.get('substance'), errors),
            approximateVolumeReleased: validateVolumeReleased(incident, errors),

            releaseType: validateIdInSet('ReleaseType_EN', incident, schema.get('releaseType'), errors),

            werePipelineSystemComponentsInvolved: validateBoolean('WerePipelineSystemComponentsInvolved', incident, errors),

            whatHappened: validateListIdsInSet('WhatHappened_ID_LIST', incident, schema.get('whatHappened'), errors),
            whyItHappened: validateListIdsInSet('WhyItHappened_ID_LIST', incident, schema.get('whyItHappened'), errors),

            incidentTypes: validateListIdsInSet('IncidentType_ID_LIST', incident, schema.get('incidentTypes'), errors),

            pipelinePhase: validateIdInSet('PipelinePhase_ID', incident, schema.get('pipelinePhase'), errors),

            volumeCategory: validateVolumeCategory(incident, errors),

            pipelineSystemComponentsInvolved: validateSystemComponentsInvolved( incident, schema, errors),


            originalData: incident,
          }

          if(errors.length > 0) {
            // console.warn('Incident record with errors:', incident, errors)
            for (const error of errors) {
              console.log(`${incident.IncidentNumber}: ${error.message} "${error.value}"`)
            }
          }
          else {
            incidents.push(incidentRecord)
          }

        }

        console.log('Incidents after validation', incidents.length)
        return afterLoad(store, Immutable.fromJS(incidents).reverse(), location)
      })
      .catch(function (error) {
        throw error
      })


    
  }


}













module.exports = DataLoader

