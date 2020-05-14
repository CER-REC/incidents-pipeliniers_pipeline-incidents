
function AddPinnedIncidentCreator (incident) {
  return {
    type: 'AddPinnedIncident',
    incident: incident,
  }
}

export default AddPinnedIncidentCreator