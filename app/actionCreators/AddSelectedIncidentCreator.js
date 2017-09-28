
function AddSelectedIncidentCreator (incident) {
  return {
    type: 'AddSelectedIncident',
    incident: incident,
  }
}

module.exports = AddSelectedIncidentCreator