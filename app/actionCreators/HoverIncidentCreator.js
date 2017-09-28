function HoverIncidentCreator (incident) {
  return {
    type: 'HoverIncident',
    incident: incident,
  }
}

module.exports = HoverIncidentCreator