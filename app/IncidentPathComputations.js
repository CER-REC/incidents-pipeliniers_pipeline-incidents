const MemoizeImmutable = require('memoize-immutable')
const Immutable = require('immutable')

const IncidentComputations = require('./IncidentComputations.js')

const IncidentPathComputations = {}



// Returns an immutable list of heights of an incident within a column
// Single selection columns will have one height, multiple selection may have
// zero or more.
// incident: an immutable incident record
// columnName: string name of the column in question
// data, columns, categories: the respective objects from the store
IncidentPathComputations.incidentHeightsInColumn = function (incident, columnName, data, columns, categories, showEmptyCategories, viewport, categoryVerticalPositions) {

  const filteredIncidents = IncidentComputations.filteredIncidents(data, columns, categories)

  switch(columnName) {
  case 'year':
  case 'company':
  case 'status':
  case 'province':
  case 'substance':
  case 'releaseType':
  case 'pipelinePhase':
  case 'volumeCategory':
  case 'substanceCategory': {

    // For single selection columns, there will be one height

    const categoryName = incident.get(columnName)
    const subsetIncidents = IncidentComputations.categorySubset(filteredIncidents, columnName, categoryName)

    return Immutable.List([
      IncidentPathComputations.incidentHeightInCategory(incident, subsetIncidents, categoryName, categoryVerticalPositions)
    ])

  }
  case 'incidentTypes':
  case 'whatHappened':
  case 'whyItHappened':
  case 'pipelineSystemComponentsInvolved': {

    // For multiple selection columns, there may be zero or more heights

    const categoryNames = incident.get(columnName)
    return categoryNames.map( categoryName => {
      
      const subsetIncidents = IncidentComputations.categorySubset(filteredIncidents, columnName, categoryName)

      return IncidentPathComputations.incidentHeightInCategory(incident, subsetIncidents, categoryName, categoryVerticalPositions)
    })

  }
  }  
  
}


IncidentPathComputations.incidentHeightInCategory = function(incident, subsetIncidents, categoryName, categoryVerticalPositions) {

  const incidentIndex = subsetIncidents.indexOf(incident)

  const heightWithinCategory = (incidentIndex / subsetIncidents.count()) * categoryVerticalPositions.getIn([categoryName, 'height'])

  return categoryVerticalPositions.getIn([categoryName, 'y']) + heightWithinCategory

}




const MemoizedComputations = {}

for (const name of Object.keys(IncidentPathComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(IncidentPathComputations[name])
}

module.exports = MemoizedComputations