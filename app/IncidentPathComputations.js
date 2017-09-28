const MemoizeImmutable = require('memoize-immutable')
const Immutable = require('immutable')

const IncidentComputations = require('./IncidentComputations.js')
const WorkspaceComputations = require('./WorkspaceComputations.js')
const CategoryComputations = require('./CategoryComputations.js')
const Constants = require('./Constants.js')

const IncidentPathComputations = {}



// Returns an immutable list of heights of an incident within a column
// Single selection columns will have one height, multiple selection may have
// zero or more.
// incident: an immutable incident record
// columnName: string name of the column in question
// data, columns, categories: the respective objects from the store
IncidentPathComputations.incidentHeightsInColumn = function (incident, columnName, data, columns, categories, showEmptyCategories, viewport, categoryVerticalPositions) {

  const filteredIncidents = IncidentComputations.filteredIncidents(data, columns, categories)

  switch(columnName) {
  case 'year':
  case 'company':
  case 'status':
  case 'province':
  case 'substance':
  case 'releaseType':
  case 'pipelinePhase':
  case 'volumeCategory': {

    // For single selection columns, there will be one height

    const categoryName = incident.get(columnName)
    const subsetIncidents = IncidentComputations.categorySubset(filteredIncidents, columnName, categoryName)

    return Immutable.List([
      IncidentPathComputations.incidentHeightInCategory(incident, subsetIncidents, categoryName, categoryVerticalPositions)
    ])

  }
  case 'incidentTypes':
  case 'whatHappened':
  case 'whyItHappened':
  case 'pipelineSystemComponentsInvolved': {

    // For multiple selection columns, there may be zero or more heights

    const categoryNames = incident.get(columnName)
    return categoryNames.map( categoryName => {
      
      const subsetIncidents = IncidentComputations.categorySubset(filteredIncidents, columnName, categoryName)

      return IncidentPathComputations.incidentHeightInCategory(incident, subsetIncidents, categoryName, categoryVerticalPositions)
    })

  }
  }  
  
}


IncidentPathComputations.incidentHeightInCategory = function(incident, subsetIncidents, categoryName, categoryVerticalPositions) {

  const incidentIndex = subsetIncidents.indexOf(incident)

  const heightWithinCategory = (incidentIndex / subsetIncidents.count()) * categoryVerticalPositions.getIn([categoryName, 'height'])

  return categoryVerticalPositions.getIn([categoryName, 'y']) + heightWithinCategory

}


// Computes a y1 and y2 value for each of the ordinary paths in the current
// configuration.
// Also computes the number of incidents in each category.

// Returns an immutable object with a shape like:
// {
//   columnPairs: [ <columnPair> ],
//   sidebarColumnPair: <columnPair>,
// }

// Where each columnPair looks like:
// {
//   source: {
//     columnName: string,
//   },
//   destination: {
//     columnName: string,
//   },
//   pathMeasurements: {
//     sourceCategoryName: {
//       destinationCategoryName: {
//         sourceMeasurement: <measurement>
//         destinationMeasurement: <measurement>
//       }
//     }
//   }
// }

// Where each measurement looks like:
// {
//   incidentCount: number,
//   sourceCategory: string,
//   destinationCategory: string,
//   y1: number,
//   y2: number,
// }

// The source and destination measurements contain y coordinates defining each
// side of the path (with the x coordinates for each path to be derived from
// the column positions)
IncidentPathComputations.pathMeasurements = function (data, columns, categories, showEmptyCategories, viewport) {

  // Do some necessary computations up front:
  const sidebarColumns = WorkspaceComputations.sidebarColumns(columns)

  const filteredData = IncidentComputations.filteredIncidents(
    data, 
    columns, 
    categories
  )

  const horizontalPositions = WorkspaceComputations.horizontalPositions(
    showEmptyCategories,
    viewport, 
    filteredData,
    columns,
    categories
  )


  // If there is a leftmost sidebar column we should
  // include it also
  let sidebarPathColumn
  if (sidebarColumns.get(0) !== undefined && columns.count() > 0) {
    sidebarPathColumn = sidebarColumns.get(0)
  }



  // For each of the columns with paths, gather some information about them.
  
  // TODO: A better name for this variable
  let categoryInfo = Immutable.Map()  
  columns.forEach( columnName => {

    const categoryVerticalPositions = WorkspaceComputations.categoryVerticalPositions(
      showEmptyCategories,
      viewport,
      filteredData,
      columns,
      categories, 
      columnName)

    const pathCategories = CategoryComputations.pathCategories(
      filteredData,
      columns,
      categories,
      columnName
    )

    categoryInfo = categoryInfo.set(columnName, pathCategories.map( (visible, categoryName) => {

      return Immutable.Map({
        verticalPosition: categoryVerticalPositions.get(categoryName),
        incidents: IncidentComputations.categorySubset(filteredData, columnName, categoryName).count(),
        columnMeasurements: horizontalPositions.getIn(['columns', columnName])
      })
    }))

  })


  
  // TODO: this and the above are a huge candidate for a refactor
  if (sidebarPathColumn !== undefined) {

    const pathCategories = CategoryComputations.pathCategories(
      filteredData,
      columns,
      categories,
      sidebarPathColumn
    )

    const categoryVerticalPositions = WorkspaceComputations.sidebarCategoryVerticalPositions(
      showEmptyCategories,
      viewport,
      filteredData,
      columns,
      categories,
      sidebarPathColumn
    )

    categoryInfo = categoryInfo.set(sidebarPathColumn, pathCategories.map( (visible, categoryName) => {
      return Immutable.Map({
        verticalPosition: categoryVerticalPositions.get(categoryName),
        incidents: IncidentComputations.categorySubset(filteredData, sidebarPathColumn, categoryName).count(),
        columnMeasurements: horizontalPositions.get('sideBar')
      })
    }))
  }




  // Find all of the column-column pairs that need paths
  // pathMeasurements: a map of maps of maps:, by source cat, by destination cat, by sourceMeasurement or destinationMeasurement

  let columnPairs = Immutable.List()
  for (let i = 0; i < columns.count() - 1; i++) {
    if (columns.get(i) === 'map' || columns.get(i+1) === 'map') {
      continue
    }

    columnPairs = columnPairs.push(Immutable.fromJS({
      source: {
        columnName: columns.get(i),
      },
      destination: {
        columnName: columns.get(i+1),
      },
      pathMeasurements: {}
    }))
  }

  let sidebarColumnPair
  if (sidebarPathColumn !== undefined) {
    sidebarColumnPair = Immutable.fromJS({
      source: {
        columnName: columns.get(columns.count() - 1),
      },
      destination: {
        columnName: sidebarPathColumn,
      },
      pathMeasurements: {}
    })
  }


  // Compute the start and end heights for each path, on each column

  // We compute the heights separately, first on the source categories, then
  // on the destination categories.

  columnPairs = columnPairs.map( columnPair => {

    const sourceVerticalPositions = WorkspaceComputations.categoryVerticalPositions(
      showEmptyCategories,
      viewport,
      filteredData,
      columns,
      categories,
      columnPair.getIn(['source', 'columnName'])
    )

    const destinationVerticalPositions = WorkspaceComputations.categoryVerticalPositions(
      showEmptyCategories,
      viewport,
      filteredData,
      columns,
      categories,
      columnPair.getIn(['destination', 'columnName'])
    )

    return IncidentPathComputations.computeHeightsForColumnPair(
      filteredData,
      columns, 
      categories,
      categoryInfo,
      columnPair,
      sourceVerticalPositions,
      destinationVerticalPositions
    )

  })

  if (sidebarColumnPair !== undefined) {

    const sourceVerticalPositions = WorkspaceComputations.categoryVerticalPositions(
      showEmptyCategories,
      viewport,
      filteredData,
      columns,
      categories,
      sidebarColumnPair.getIn(['source', 'columnName'])
    )

    const destinationVerticalPositions = WorkspaceComputations.sidebarCategoryVerticalPositions(
      showEmptyCategories,
      viewport,
      filteredData,
      columns,
      categories,
      sidebarPathColumn
    )
    sidebarColumnPair = IncidentPathComputations.computeHeightsForColumnPair(
      filteredData,
      columns, 
      categories,
      categoryInfo,
      sidebarColumnPair,
      sourceVerticalPositions,
      destinationVerticalPositions
    )
  }


  return Immutable.Map({
    columnPairs: columnPairs,
    sidebarColumnPair: sidebarColumnPair,
  })

}




IncidentPathComputations.computeHeightsForColumnPair = function(filteredData, columns, categories, categoryInfo, columnPair, sourceVerticalPositions, destinationVerticalPositions) {


  const sourcePathCategories = CategoryComputations.pathCategories(
    filteredData,
    columns,
    categories,
    columnPair.getIn(['source', 'columnName'])
  )

  const destPathCategories = CategoryComputations.pathCategories(
    filteredData,
    columns,
    categories,
    columnPair.getIn(['destination', 'columnName'])
  )



  // TODO: These two giant loops on sourcePathCategories and 
  // destPathCategories share exactly the same logic, but reversed.
  // Find a way to refactor this.

  sourcePathCategories.forEach( (sVisible, sourceCategory) => {

    const sourceCategoryIncidents = categoryInfo.getIn([
      columnPair.getIn(['source', 'columnName']),
      sourceCategory, 
      'incidents'
    ])

    const sourceCategoryHeight = sourceVerticalPositions.getIn([sourceCategory, 'height'])

    // A map of destination category names to a count of incidents shared
    // between the source category and destination category
    // We filter out the destination categories with no shared incidents
    const mutualIncidentCounts = destPathCategories.map( (dVisible, destinationCategory) => {

      return CategoryComputations.itemsInBothCategories(
        filteredData,
        columnPair.getIn(['source', 'columnName']),
        sourceCategory,
        columnPair.getIn(['destination', 'columnName']),
        destinationCategory
      )
    }).filter( count => count > 0 )

    const destinationCategoryIncidents = mutualIncidentCounts.reduce( (sum, count) => { return sum + count }, 0)

    let heightFactor
    if (sourceCategoryIncidents >= destinationCategoryIncidents) {
      // When there is the same number of incidents in the source category and
      // all of its destination categories, the height for all of the outgoing
      // paths should match the height of the category.
      // When there are more incidents in the source category than its
      // destinations, we are next to the system components column. We don't
      // use the full height of the category.
      // In either case, we apply no modifier to the heights
      heightFactor = 1
    }
    else {
      // When there are fewer incidents in the source category than in all of
      // its destination categories, we are next to a multiple selection
      // column and at least one incident is in more than one destination
      // category. The vertical height of all the paths added together will be
      // higher than the height of the outgoing category, so we apply a
      // modifier to scale the outgoing paths fit to within the category's 
      // height.

      heightFactor = sourceCategoryIncidents / destinationCategoryIncidents
    }

    let currentY = sourceVerticalPositions.getIn([sourceCategory, 'y'])

    mutualIncidentCounts.forEach( (count, destinationCategory) => {

      const y1 = currentY
      const y2 = y1 + (count / sourceCategoryIncidents) * sourceCategoryHeight * heightFactor

      const measurements = Immutable.fromJS({
        incidentCount: count,
        sourceCategory: sourceCategory,
        destinationCategory: destinationCategory,
        y1: y1,
        y2: y2,
      })
    
      columnPair = columnPair.setIn(['pathMeasurements', sourceCategory, destinationCategory, 'sourceMeasurement'], measurements)

      currentY = y2

    })

  })



  destPathCategories.forEach( (dVisible, destinationCategory) => {

    const destinationCategoryIncidents = categoryInfo.getIn([
      columnPair.getIn(['destination', 'columnName']),
      destinationCategory,
      'incidents'
    ])

    const destinationCategoryHeight = destinationVerticalPositions.getIn([destinationCategory, 'height'])

    // A map of source category names to a count of incidents shared
    // between the source category and destination category
    // We filter out the source categories with no shared incidents
    const mutualIncidentCounts = sourcePathCategories.map( (sVisible, sourceCategory) => {

      return CategoryComputations.itemsInBothCategories(
        filteredData,
        columnPair.getIn(['source', 'columnName']),
        sourceCategory,
        columnPair.getIn(['destination', 'columnName']),
        destinationCategory
      )
    }).filter( count => count > 0 )

    const sourceCategoryIncidents = mutualIncidentCounts.reduce( (sum, count) => { return sum + count }, 0)


    let heightFactor
    if (destinationCategoryIncidents >= sourceCategoryIncidents) {
      heightFactor = 1
    }
    else {
      heightFactor = destinationCategoryIncidents / sourceCategoryIncidents 
    }

    let currentY = destinationVerticalPositions.getIn([destinationCategory, 'y'])

    mutualIncidentCounts.forEach( (count, sourceCategory) => {

      const y1 = currentY
      const y2 = y1 + (count / destinationCategoryIncidents) * destinationCategoryHeight * heightFactor

      const measurements = Immutable.fromJS({
        incidentCount: count,
        sourceCategory: sourceCategory,
        destinationCategory: destinationCategory,
        y1: y1,
        y2: y2,
      })

      columnPair = columnPair.setIn(['pathMeasurements', sourceCategory, destinationCategory, 'destinationMeasurement'], measurements)


      currentY = y2

    })
  })

  return columnPair
}






// Given a pathMeasurements object as produced by pathMeasurements or
// flowPathMeasurements (along with the usual assortment of state elements), 
// produces an immutable list of objects with a d path attribute, plus source 
// and destination category names.

IncidentPathComputations.pathCurves = function (data, columns, categories, showEmptyCategories, viewport, pathMeasurements, columnName) {


  const filteredData = IncidentComputations.filteredIncidents(
    data, 
    columns, 
    categories
  )

  const horizontalPositions = WorkspaceComputations.horizontalPositions(
    showEmptyCategories,
    viewport,
    filteredData,
    columns,
    categories
  )


  const nextToSidebarColumn = columnName === columns.last()

  let columnPair
  if (nextToSidebarColumn) {
    // Rendering paths to the sidebar
    columnPair = pathMeasurements.get('sidebarColumnPair')
  }
  else {
    // Rendering paths to another column
    columnPair = pathMeasurements.get('columnPairs').find( columnPairSearch => {
      return columnPairSearch.getIn(['source', 'columnName']) === columnName
    })
  }

  if (columnPair === undefined) {
    return []
  }


  const sourceX = horizontalPositions.getIn(['columns', columnName]).get('x') + WorkspaceComputations.columnWidth(columns)
  
  let destinationX
  if (nextToSidebarColumn) {
    destinationX = horizontalPositions.getIn(['sideBar', 'x'])
  }
  else {
    destinationX = horizontalPositions.getIn([
      'columns', 
      columnPair.getIn(['destination', 'columnName'])
    ]).get('x')
  }


  let paths = Immutable.List()

  const curveControlThreshold = IncidentPathComputations.curveControlThreshold(sourceX, destinationX)

  columnPair.get('pathMeasurements').forEach( (sourceMeasurements, sourceCategory) => {
    sourceMeasurements.forEach( (measurements, destinationCategory) => {

      const sourceMeasurement = measurements.get('sourceMeasurement')
      const destinationMeasurement = measurements.get('destinationMeasurement')

      const sourceY1 = sourceMeasurement.get('y1')
      const sourceY2 = sourceMeasurement.get('y2')
      const destinationY1 = destinationMeasurement.get('y1')
      const destinationY2 = destinationMeasurement.get('y2')

      let d = `M ${sourceX} ${sourceY1} `
      d += `C ${sourceX + curveControlThreshold} ${sourceY1} `
      d += `${destinationX - curveControlThreshold} ${destinationY1} `
      d += `${destinationX} ${destinationY1} `
      d += `L ${destinationX} ${destinationY2} `
      d += `C ${destinationX - curveControlThreshold} ${destinationY2} `
      d += `${sourceX + curveControlThreshold} ${sourceY2} `
      d += `${sourceX} ${sourceY2}`

      paths = paths.push(Immutable.Map({
        d: d, 
        sourceCategory: sourceCategory, 
        destinationCategory: destinationCategory,
      }))
    })

  })

  return paths

}



IncidentPathComputations.curveControlThreshold = function(x1, x2) {
  return Math.abs(x1 - x2) / Constants.get('pathCurveControlFactor')
}






// flowPathMeasurements and computeFlowHeightsForColumnPair work together to
// produce measurements for 'flowing paths', which highlight a subset of the
// incidents and group all of the paths together at the centre of each
// category.
// flowPathMeasurements returns an immutable object with the same shape as 
// pathMeasurements, but the logic used to do so is subtly and crucially
// different in a number of details. Maintainer beware! 


IncidentPathComputations.flowPathMeasurements = function (data, columns, categories, showEmptyCategories, viewport, categoryHoverState, filterboxActivationState) {

  // Do some necessary computations up front:
  const sidebarColumns = WorkspaceComputations.sidebarColumns(columns)

  const filteredData = IncidentComputations.filteredIncidents(
    data, 
    columns, 
    categories
  )

  const horizontalPositions = WorkspaceComputations.horizontalPositions(
    showEmptyCategories,
    viewport, 
    filteredData,
    columns,
    categories
  )

  const incidentsInCategorySelection = IncidentComputations.incidentsInCategorySelection(
    filteredData,
    categoryHoverState,
    filterboxActivationState
  )

  if (incidentsInCategorySelection === null || incidentsInCategorySelection.count() === 0) {

    // There are no paths to draw here
    return Immutable.fromJS({
      columnPairs: [],
      // Yes, undefined is the correct value for when this is not present, for
      // some reason
      sidebarColumnPair: undefined,
    })

  }


  // If there is a leftmost sidebar column we should include it also
  let sidebarPathColumn
  if (sidebarColumns.get(0) !== undefined && columns.count() > 0) {
    sidebarPathColumn = sidebarColumns.get(0)
  }



  // For each of the columns with paths, gather some information about them.

  let categoryInfo = Immutable.Map()
  columns.forEach( columnName => {

    const categoryVerticalPositions = WorkspaceComputations.categoryVerticalPositions(
      showEmptyCategories,
      viewport,
      filteredData,
      columns,
      categories,
      columnName)

    const pathCategories = CategoryComputations.pathCategories(
      filteredData,
      columns,
      categories,
      columnName
    )


    categoryInfo = categoryInfo.set(columnName, pathCategories.map( (visible, categoryName) => {

      const categoryIncidents = IncidentComputations.categorySubset(
        filteredData, 
        columnName, 
        categoryName
      )

      const focusedCategoryIncidents = IncidentComputations.categorySubset(
        incidentsInCategorySelection, 
        columnName, 
        categoryName
      )

      const heightFraction = focusedCategoryIncidents.count() / categoryIncidents.count()


      const verticalPosition = categoryVerticalPositions.get(categoryName)
      const height = verticalPosition.get('height') * heightFraction

      const pathVerticalPosition = Immutable.Map({
        height: height,
        y: (verticalPosition.get('y') + verticalPosition.get('height') / 2) - (height / 2),
        // y: verticalPosition.get('y') + (height / 2),
      })

      return Immutable.Map({
        verticalPosition: pathVerticalPosition,
        incidents: focusedCategoryIncidents,
        columnMeasurements: horizontalPositions.getIn(['columns', columnName]),
      })
    }))

  })


  
  // TODO: this and the above are a huge candidate for a refactor
  if (sidebarPathColumn !== undefined) {

    const pathCategories = CategoryComputations.pathCategories(
      filteredData,
      columns,
      categories,
      sidebarPathColumn
    )

    const categoryVerticalPositions = WorkspaceComputations.sidebarCategoryVerticalPositions(
      showEmptyCategories,
      viewport,
      filteredData,
      columns,
      categories,
      sidebarPathColumn
    )

    categoryInfo = categoryInfo.set(sidebarPathColumn, pathCategories.map( (visible, categoryName) => {

      const categoryIncidents = IncidentComputations.categorySubset(
        filteredData, 
        sidebarPathColumn, 
        categoryName
      )

      const focusedCategoryIncidents = IncidentComputations.categorySubset(
        incidentsInCategorySelection, 
        sidebarPathColumn, 
        categoryName
      )

      const heightFraction = focusedCategoryIncidents.count() / categoryIncidents.count()

      const verticalPosition = categoryVerticalPositions.get(categoryName)
      const height = verticalPosition.get('height') * heightFraction

      const pathVerticalPosition = Immutable.Map({
        height: height,
        y: (verticalPosition.get('y') + verticalPosition.get('height') / 2) - (height / 2),
        // y: verticalPosition.get('y') + height / 2,
      })

      return Immutable.Map({
        verticalPosition: pathVerticalPosition,
        incidents: focusedCategoryIncidents,
        columnMeasurements: horizontalPositions.get('sideBar')
      })
    }))
  }




  // Find all of the column-column pairs that need paths
  // pathMeasurements: a map of maps of maps: by source cat, by destination 
  // cat, by sourceMeasurement or destinationMeasurement

  // TODO: function me
  let columnPairs = Immutable.List()
  for (let i = 0; i < columns.count() - 1; i++) {
    if (columns.get(i) === 'map' || columns.get(i+1) === 'map') {
      continue
    }

    columnPairs = columnPairs.push(Immutable.fromJS({
      source: {
        columnName: columns.get(i),
      },
      destination: {
        columnName: columns.get(i+1),
      },
      pathMeasurements: {}
    }))
  }

  let sidebarColumnPair
  if (sidebarPathColumn !== undefined) {
    sidebarColumnPair = Immutable.fromJS({
      source: {
        columnName: columns.get(columns.count() - 1),
      },
      destination: {
        columnName: sidebarPathColumn,
      },
      pathMeasurements: {}
    })
  }

  columnPairs = columnPairs.map( columnPair => {
    return IncidentPathComputations.computeFlowHeightsForColumnPair(
      filteredData,
      columns, 
      categories,
      categoryInfo,
      columnPair
    )
  })

  if (sidebarColumnPair !== undefined) {
    sidebarColumnPair = IncidentPathComputations.computeFlowHeightsForColumnPair(
      filteredData,
      columns, 
      categories,
      categoryInfo,
      sidebarColumnPair
    )
  }

  return Immutable.Map({
    columnPairs: columnPairs,
    sidebarColumnPair: sidebarColumnPair,
  })

}






IncidentPathComputations.computeFlowHeightsForColumnPair = function(filteredData, columns, categories, categoryInfo, columnPair) {

  const sourceColumn = columnPair.getIn(['source', 'columnName'])
  const destinationColumn = columnPair.getIn(['destination', 'columnName'])

  const sourcePathCategories = CategoryComputations.pathCategories(
    filteredData,
    columns,
    categories,
    sourceColumn
  )

  const destPathCategories = CategoryComputations.pathCategories(
    filteredData,
    columns,
    categories,
    destinationColumn
  )



  // TODO: These two giant loops on sourcePathCategories and 
  // destPathCategories share exactly the same logic, but reversed.
  // Find a way to refactor this.

  sourcePathCategories.forEach( (sVisible, sourceCategory) => {

    const sourceCategoryIncidents = categoryInfo.getIn([
      columnPair.getIn(['source', 'columnName']),
      sourceCategory, 
      'incidents'
    ])

    // NB: These are the incidents which are in the selection and in the source
    // category
    const incidents = categoryInfo.getIn([sourceColumn, sourceCategory, 'incidents'])

    const sourceCategoryVerticalPosition = categoryInfo.getIn([sourceColumn, sourceCategory, 'verticalPosition'])

    // A map of destination category names to a count of incidents shared
    // between the source category and destination category
    // We filter out the destination categories with no shared incidents
    const mutualIncidentCounts = destPathCategories.map( (dVisible, destinationCategory) => {

      return IncidentComputations.categorySubset(incidents, destinationColumn, destinationCategory).count()

    }).filter( count => count > 0 )

    const destinationCategoryIncidents = mutualIncidentCounts.reduce( (sum, count) => { return sum + count }, 0)

    let heightFactor
    if (sourceCategoryIncidents.count() >= destinationCategoryIncidents) {
      // When there is the same number of incidents in the source category and
      // all of its destination categories, the height for all of the outgoing
      // paths should match the height of the category.
      // When there are more incidents in the source category than its
      // destinations, we are next to the system components column. We don't
      // use the full height of the category.
      // In either case, we apply no modifier to the heights
      heightFactor = 1
    }
    else {
      // When there are fewer incidents in the source category than in all of
      // its destination categories, we are next to a multiple selection
      // column and at least one incident is in more than one destination
      // category. The vertical height of all the paths added together will be
      // higher than the height of the outgoing category, so we apply a
      // modifier to scale the outgoing paths fit to within the category's 
      // height.
      heightFactor = sourceCategoryIncidents.count() / destinationCategoryIncidents
    }

    let currentY = sourceCategoryVerticalPosition.get('y')

    mutualIncidentCounts.forEach( (count, destinationCategory) => {

      const y1 = currentY
      const y2 = y1 + (count / sourceCategoryIncidents.count()) * sourceCategoryVerticalPosition.get('height') * heightFactor

      const measurements = Immutable.fromJS({
        incidentCount: count,
        sourceCategory: sourceCategory,
        destinationCategory: destinationCategory,
        y1: y1,
        y2: y2,
      })
    
      columnPair = columnPair.setIn(['pathMeasurements', sourceCategory, destinationCategory, 'sourceMeasurement'], measurements)

      currentY = y2

    })

  })



  destPathCategories.forEach( (dVisible, destinationCategory) => {

    const destinationCategoryIncidents = categoryInfo.getIn([
      columnPair.getIn(['destination', 'columnName']),
      destinationCategory,
      'incidents'
    ])

    // NB: These are the incidents which are in the selection and in the source
    // category
    const incidents = categoryInfo.getIn([destinationColumn, destinationCategory, 'incidents'])

    const destinationCategoryVerticalPosition = categoryInfo.getIn([destinationColumn, destinationCategory, 'verticalPosition'])

    // A map of source category names to a count of incidents shared
    // between the source category and destination category
    // We filter out the source categories with no shared incidents
    const mutualIncidentCounts = sourcePathCategories.map( (sVisible, sourceCategory) => {

      return IncidentComputations.categorySubset(incidents, sourceColumn, sourceCategory).count()

    }).filter( count => count > 0 )

    const sourceCategoryIncidents = mutualIncidentCounts.reduce( (sum, count) => { return sum + count }, 0)


    let heightFactor
    if (destinationCategoryIncidents.count() >= sourceCategoryIncidents) {
      heightFactor = 1
    }
    else {
      heightFactor = destinationCategoryIncidents.count() / sourceCategoryIncidents 
    }

    let currentY = destinationCategoryVerticalPosition.get('y')

    mutualIncidentCounts.forEach( (count, sourceCategory) => {

      const y1 = currentY
      const y2 = y1 + (count / destinationCategoryIncidents.count()) * destinationCategoryVerticalPosition.get('height') * heightFactor

      const measurements = Immutable.fromJS({
        incidentCount: count,
        sourceCategory: sourceCategory,
        destinationCategory: destinationCategory,
        y1: y1,
        y2: y2,
      })

      columnPair = columnPair.setIn(['pathMeasurements', sourceCategory, destinationCategory, 'destinationMeasurement'], measurements)

      currentY = y2

    })
  })

  return columnPair
}




// Produces height information for drawing lines to represent the currently
// selected incidents.

// The returned object is a set of Immutable maps nested two deep, keyed by:
// columnName => incident object => list of heights
// Since an incident may appear more than once (or even zero times) in a 
// column, each incident will have a list of zero or more heights.

IncidentPathComputations.selectedIncidentPaths = function (data, columns, categories, showEmptyCategories, viewport, selectedIncidents, hoveredIncident) {


  const filteredData = IncidentComputations.filteredIncidents(
    data, 
    columns, 
    categories
  )

  let filteredSelectedIncidents = selectedIncidents
  if (hoveredIncident !== null) {
    filteredSelectedIncidents = selectedIncidents.push(hoveredIncident)
  }

  filteredSelectedIncidents = IncidentComputations.filteredIncidents(
    filteredSelectedIncidents,
    columns, 
    categories
  )

  // Find how many selected incidents are in each category

  const selectedIncidentsInCategories = Immutable.Map(columns.map( columnName => {

    const displayedCategories = CategoryComputations.displayedCategories(
      filteredData,
      columns,
      categories,
      columnName
    )

    const categoryIncidents = displayedCategories.map( (visible, categoryName) => {

      return IncidentComputations.categorySubset(
        filteredSelectedIncidents,
        columnName,
        categoryName
      )

    })

    return [columnName, categoryIncidents]
  }))

  
  // Compute heights for the selected incidents in each category

  const selectedIncidentHeights = selectedIncidentsInCategories.map( (innerCategories, columnName) => {

    const categoryVerticalPositions = WorkspaceComputations.categoryVerticalPositions(
      showEmptyCategories,
      viewport,
      filteredData,
      columns,
      categories,
      columnName
    )

    let incidentHeights = Immutable.Map()

    innerCategories.forEach( (incidents, categoryName) => {

      incidents.forEach( (incident, i) => {

        let heightList = incidentHeights.get(incident)
        if (heightList === undefined) {
          heightList = Immutable.List()
        }

        const categoryPosition = categoryVerticalPositions.get(categoryName)

        // Height, keyed by incident object
        // To ensure that incident lines land well within their categories, we
        // allow for some space above and below. The vertical height of the
        // category is divided into 0..n+1 heights, and only the heights from
        // 1..n are used as path heights.

        heightList = heightList.push(categoryPosition.get('y') + categoryPosition.get('height') * (i + 1) / (incidents.count() + 1))

        incidentHeights = incidentHeights.set(incident, heightList)

      })

    })

    return incidentHeights

  })

  return selectedIncidentHeights

}














const MemoizedComputations = {}

for (const name of Object.keys(IncidentPathComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(IncidentPathComputations[name])
}

window.ipc = MemoizedComputations

module.exports = MemoizedComputations