
function AddSelectedIncidentCreator (incident) {
  return {
    type: 'AddSelectedIncident',
    incident: incident,
  }
}

export default AddSelectedIncidentCreator