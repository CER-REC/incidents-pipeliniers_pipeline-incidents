
function RemoveSelectedIncidentCreator (incident) {
  return {
    type: 'RemoveSelectedIncident',
    incident: incident,
  }
}

export default RemoveSelectedIncidentCreator