
function RemoveSelectedIncidentCreator (incident) {
  return {
    type: 'RemoveSelectedIncident',
    incident: incident,
  }
}

module.exports = RemoveSelectedIncidentCreator