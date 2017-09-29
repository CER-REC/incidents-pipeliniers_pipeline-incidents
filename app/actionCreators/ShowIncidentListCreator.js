
function ShowIncidentListCreator (incidents) {
  return {
    type: 'ShowIncidentList',
    incidents: incidents,
  }
}

module.exports = ShowIncidentListCreator