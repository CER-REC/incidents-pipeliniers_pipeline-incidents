
function RemovePinnedIncidentCreator (incident) {
  return {
    type: 'RemovePinnedIncident',
    incident: incident,
  }
}

export default RemovePinnedIncidentCreator