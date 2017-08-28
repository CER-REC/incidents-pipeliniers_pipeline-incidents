
function AddPinnedIncidentCreator (incident) {
  return {
    type: 'AddPinnedIncident',
    incident: incident,
  }
}

module.exports = AddPinnedIncidentCreator