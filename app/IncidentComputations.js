

const IncidentComputations = {}






// Returns a subset of data, the list of incidents actually on display
// The filter settings (e.g. which categories are enabled) for columns which are
// not displayed are ignored

// data: the incident data from the store
// columns: the list of columns on display, from the store
// categories: the category display data from the store
IncidentComputations.filteredIncidents = function (data, columns, categories) {


  return columns.reduce( (filteredData, columnName) => {

    const categoryInfo = categories.get(columnName)
    return filteredData.filter( item => {

      switch(columnName) {

      // The single attribute columns are simple to filter, only keep the
      // incident if the category settings include the category it falls into
      case 'company':
        return categoryInfo.get(item.get('company')) === true
      case 'status':
        return categoryInfo.get(item.get('status')) === true
      case 'province':
        return categoryInfo.get(item.get('province')) === true
      case 'substance':
        return categoryInfo.get(item.get('substance')) === true
      case 'releaseType':
        return categoryInfo.get(item.get('releaseType')) === true
      case 'pipelinePhase':
        return categoryInfo.get(item.get('pipelinePhase')) === true
      case 'volumeCategory':
        return categoryInfo.get(item.get('volumeCategory')) === true
      case 'substanceCategory':
        return categoryInfo.get(item.get('substanceCategory')) === true
      case 'year':
        return categoryInfo.get(item.get('year')) === true


      // The multiple category columns are more complex
      // If any of the categories are on display, then the item is shown

      // TODO: Making function objects so deeply in this loop may be a bad
      // idea for performance!

      case 'incidentTypes': {
        let displayed = false
        item.get('incidentTypes').forEach( incidentType => {
          if (categoryInfo.get(incidentType) === true) {
            displayed = true
          }
        })
        return displayed
      }
      case 'whatHappened': {
        let displayed = false
        item.get('whatHappened').forEach( what => {
          if (categoryInfo.get(what) === true) {
            displayed = true
          }
        })
        return displayed
      }
      case 'whyItHappened': {
        let displayed = false
        item.get('whyItHappened').forEach( why => {
          if (categoryInfo.get(why) === true) {
            displayed = true
          }
        })

        return displayed
      }

      case 'pipelineSystemComponentsInvolved': {
        // Uniquely, many incidents have no pipeline components, e.g. they have
        // an empty list for this attribute. This has two unusual consequences:
        // - the incident does not appear in the pipeline components column
        // - the incident cannot be filtered out by the category settings for
        //   the pipeline components column
        const components = item.get('pipelineSystemComponentsInvolved')

        if (components.count() === 0) {
          return true
        }

        let displayed = false
        components.forEach( component => {
          if (categoryInfo.get(component) === true) {
            displayed = true
          }
        })
        return displayed
      }

      case 'map':
        // No categories for map, so we don't filter any items
        return true
      }


    })


  }, data)


}







window.ic = IncidentComputations
module.exports = IncidentComputations