
function RemovePinnedIncidentCreator (incident) {
  return {
    type: 'RemovePinnedIncident',
    incident: incident,
  }
}

module.exports = RemovePinnedIncidentCreator