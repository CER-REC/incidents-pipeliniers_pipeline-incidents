function ResetVisualizationCreator (categories, incident) {

  return {
    type: 'ResetVisualization',
    categories: categories,
    incident: incident,
  }

}



module.exports = ResetVisualizationCreator