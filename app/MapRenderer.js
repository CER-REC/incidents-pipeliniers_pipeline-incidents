import * as D3geo from 'd3-geo'
import Promise from 'bluebird'
import Immutable from 'immutable'
import Chroma from 'chroma-js'

import Constants from './Constants.js'
import MapComputations from './MapComputations.js'
import IncidentComputations from './IncidentComputations.js'
import WorkspaceComputations from './WorkspaceComputations.js'
import CategoryComputations from './CategoryComputations.js'


// NB: The configuration of the projection here *must* match the settings used
// to produce the canada.svg, or the incidents will not be positioned
// accurately!
// See the Canada-Geoprojection repository associated with this project.
const projection = D3geo.geoConicEqualArea()
  .parallels([50, 70])
  .rotate([105, 0])
  .translate([ 170.02947192819542, 533.967862955717 ])
  .scale(582.1261797303048)


const mapPromise = new Promise ( (resolve, reject) => {

  const image = document.createElement('img')

  image.onload = () => resolve(image)

  image.setAttribute('src', 'images/canada.450.svg')

})



const RenderRoutines = {



  longLatToMapCoordinates(long, lat, basemapPosition) {

    const projectedPosition = projection([long, lat])

    const padding = Constants.getIn(['map', 'padding'])
    const xOffset = basemapPosition.get('x')
    const yOffset = basemapPosition.get('y')
    const ratio = basemapPosition.get('ratio')

    return {
      x: projectedPosition[0] * ratio + xOffset + padding,
      y: projectedPosition[1] * ratio + yOffset + padding,
    }

  },



  // To help de-clutter the map, the control point for the bezier curve in/out
  // of each map point is positioned toward the edge of the map.
  // To do this, we take the centre of the map and project a line from the
  // centre through the incident point, out to a fixed distance.
  // Since the bezier curve will try to approach the incident point from the
  // direction of the control point, this has the effect of pushing the curves
  // away from the centre of the map, towards the perimeter.
  // TODO: This is an improvement, but it's not good enough.

  // props: the Map properties object
  // incidentPoint: a plain javascript object with x, y, map coordinates as
  //   prepared by longLatToMapCoordinates
  radialControlPoint(props, incidentPoint) {

    const filteredData = IncidentComputations.filteredIncidents(
      props.data,
      props.columns,
      props.categories)

    const basemapCentre = MapComputations.basemapCentre(
      props.showEmptyCategories,
      props.viewport,
      filteredData,
      props.columns,
      props.categories)

    const radialControlPointDistance = Constants.getIn(['map', 'radialControlPointDistance'])

    // First, find the angle between the centre point and our incident
    const distance = Math.sqrt(
      Math.pow(basemapCentre.get('x') - incidentPoint.x, 2) + 
      Math.pow(basemapCentre.get('y') - incidentPoint.y, 2)
    )

    const angle = Math.atan2(incidentPoint.y - basemapCentre.get('y'),
      incidentPoint.x - basemapCentre.get('x'))

    // Second, define the new point some distance from the incident, along
    // the line given by the angle and the map centre.
    return {
      x: basemapCentre.get('x') + Math.cos(angle) * (distance + radialControlPointDistance),
      y: basemapCentre.get('y') + Math.sin(angle) * (distance + radialControlPointDistance),
    }

  },


  // contextTuples: an array of objects with two attributes:
  //   context: the context2d to render
  //   fillStyle: the colour to use
  drawCircle(contextTuples, x, y, radius) {

    for (const {context, fillStyle} of contextTuples) {
      context.fillStyle = fillStyle
      context.beginPath()
      context.arc(x, y, radius, 0, 2 * Math.PI)
      context.fill()
    }

  },


  // contextTuples: an array of objects with two attributes:
  //   context: the context2d to render
  //   strokeStyle: the colour to use
  drawBezier(contextTuples, x0, y0, x1, y1, x2, y2, x3, y3) {

    // From the wiki, on cubic bezier curves:
    // The curve starts at P0 going toward P1 and arrives at P3 coming 
    // from the direction of P2

    for (const {context, strokeStyle} of contextTuples) {
      context.strokeStyle = strokeStyle
      context.beginPath()
      context.moveTo(x0, y0)
      context.bezierCurveTo(x1, y1, x2, y2, x3, y3)
      context.stroke()
    }

  },




  clear(context, fillStyle, props) {

    const filteredData = IncidentComputations.filteredIncidents(
      props.data,
      props.columns,
      props.categories)

    const mapDimensions = WorkspaceComputations.mapDimensions(
      props.showEmptyCategories,
      props.viewport,
      filteredData,
      props.columns,
      props.categories)

    context.fillStyle = fillStyle
    context.fillRect(
      0,
      0,
      mapDimensions.get('width'),
      mapDimensions.get('height')
    )

  },




  drawMap(renderContext, props, basemapImage) {
    const padding = Constants.getIn(['map', 'padding'])
    
    const filteredData = IncidentComputations.filteredIncidents(
      props.data,
      props.columns,
      props.categories)

    const basemapPosition = MapComputations.basemapPosition(
      props.showEmptyCategories,
      props.viewport,
      filteredData,
      props.columns,
      props.categories)

    renderContext.drawImage(basemapImage, 
      basemapPosition.get('x') + padding,
      basemapPosition.get('y') + padding,
      basemapPosition.get('width'),
      basemapPosition.get('height')
    )
    
  },

  drawLines(renderContext, props) {
    
    const mapAdjacentColumns = CategoryComputations.mapAdjacentColumns(
      props.columns)

    if (mapAdjacentColumns.get('left') !== null) {
      RenderRoutines.drawLeftLines(renderContext, props, mapAdjacentColumns.get('left'))
    }

    if (mapAdjacentColumns.get('right') !== null) {
      RenderRoutines.drawRightLines(renderContext, props, mapAdjacentColumns.get('right'))
    }

  },


  connectorStrokeColour(incident, props) {

    if (props.hoveredIncident === incident){
      return Constants.getIn(['map', 'selectedLightGrey'])
    }
    else if (props.selectedIncidents.contains(incident)) {
      return Constants.getIn(['map', 'selectedLightGrey'])
    }
    else {
      return Constants.getIn(['map', 'deselectedLightGrey'])
    }
    
  },

  toIncidentStrokeColour(incident, props, context, x1, y1, x2, y2) {

    if (props.hoveredIncident === incident){
      return Constants.getIn(['map', 'selectedLightGrey'])
    }
    else if (props.selectedIncidents.contains(incident)) {
      return Constants.getIn(['map', 'selectedLightGrey'])
    }
    else {
      const gradient = context.createLinearGradient(x1, y1, x2, y2)
      gradient.addColorStop(0, Constants.getIn(['map', 'deselectedLightGrey']))
      gradient.addColorStop(1, Constants.getIn(['map', 'deselectedLightGreyBlank']))
      return gradient
    }
    
  },

  fromIncidentStrokeColour(incident, props, context, x1, y1, x2, y2) {

    if (props.hoveredIncident === incident){
      return Constants.getIn(['map', 'selectedLightGrey'])
    }
    else if (props.selectedIncidents.contains(incident)) {
      return Constants.getIn(['map', 'selectedLightGrey'])
    }
    else {
      const gradient = context.createLinearGradient(x1, y1, x2, y2)
      gradient.addColorStop(0, Constants.getIn(['map', 'deselectedLightGreyBlank']))
      gradient.addColorStop(1, Constants.getIn(['map', 'deselectedLightGrey']))
      return gradient
    }

  },


  drawLeftLines(renderContext, props, columnName) {

    const filteredData = IncidentComputations.filteredIncidents(
      props.data,
      props.columns,
      props.categories)

    const displayedCategories = CategoryComputations.displayedCategories(
      filteredData,
      props.columns,
      props.categories,
      columnName)

    // count of items
    const itemsInCategories = displayedCategories.map( (displayed, categoryName) => {
  
      return CategoryComputations.itemsInCategory(
        filteredData,
        columnName,
        categoryName
      )
    })

    const categoryHeights = WorkspaceComputations.categoryHeights(
      props.showEmptyCategories,
      props.viewport,
      filteredData,
      props.columns,
      props.categories, 
      columnName)

    const basemapPosition = MapComputations.basemapPosition(
      props.showEmptyCategories,
      props.viewport,
      filteredData,
      props.columns,
      props.categories)


    // TODO: Once again, not that happy accumulating height like this
    let currentY = 0

    const bundleOffsetDistance = Constants.getIn(['map', 'bundleOffsetDistance'])

    itemsInCategories.forEach( (count, categoryName) => {

      const categoryHeight = categoryHeights.get(categoryName)
      const categoryCount = itemsInCategories.get(categoryName)

      // The bundle region is a line 1/3 the height of the column itself,
      // parallel to it, bundleOffsetDistance away.
      // The incident paths are pulled together into the bundle region, and
      // then are allowed to fan out onto the map itself.
      // We define the top and bottom coordinates for the region
      const bundleRegionTopY = currentY + categoryHeight / 3
      const bundleRegionBottomY = currentY + categoryHeight * 2 / 3

      const subsetData = IncidentComputations.categorySubset(
        filteredData,
        columnName,
        categoryName) 


      subsetData.forEach ( (incident, index) => {

        // Don't try to draw lines for incidents without location data
        if (incident.get('longitude') === 'Not Provided' || 
          incident.get('latitude') === 'Not Provided') {
          return
        }

        if (!RenderRoutines.incidentHasFocus(incident, props)) {
          return
        }

        const bundleY = bundleRegionTopY + (bundleRegionBottomY - bundleRegionTopY) * (index / categoryCount)

        let x1 = 0
        let y1 = currentY + categoryHeight * (index / categoryCount)
        let x2 = bundleOffsetDistance
        let y2 = bundleY

        let strokeColour = RenderRoutines.connectorStrokeColour(incident, props)


        // Draw paths from left column to bundle region
        RenderRoutines.drawBezier(
          [{
            context: renderContext,
            strokeStyle: strokeColour,
          }],
          // Starting point, on the left column
          x1,
          y1,

          // The first control point is to the right of the incident's 
          // slot on the column
          10,
          currentY + categoryHeight * (index / categoryCount),

          // The second control point is to the left of the bundle point
          // for this incident
          bundleOffsetDistance - 10,
          bundleY,

          // The bundle point for this incident
          x2, 
          y2
        )

        // Draw paths from bundle region to incidents on map
        const incidentPosition = RenderRoutines.longLatToMapCoordinates(
          incident.get('longitude'),
          incident.get('latitude'),
          basemapPosition
        )

        const destinationControlPoint = RenderRoutines.radialControlPoint(props, incidentPosition)
        const curveControlThreshold = Math.abs(bundleOffsetDistance - incidentPosition.x) / Constants.get('pathCurveControlFactor')

        x1 = bundleOffsetDistance
        y1 = bundleY
        x2 = incidentPosition.x
        y2 = incidentPosition.y

        strokeColour = RenderRoutines.toIncidentStrokeColour(incident, props, renderContext, x1, y1, x2, y2)

        // Draw paths from bundle region to incidents
        RenderRoutines.drawBezier(
          [{
            context: renderContext,
            strokeStyle: strokeColour,
          }],

          // The incident's point in the bundle region
          x1,
          y1,

          // Control point 1, right of the bundle
          bundleOffsetDistance + curveControlThreshold,
          bundleY,

          // Control point 2, placed away from the destination point
          destinationControlPoint.x - curveControlThreshold,
          destinationControlPoint.y,

          x2,
          y2
        )

      })

      currentY += categoryHeight
    })
    
  },



  drawRightLines(renderContext, props, columnName) {

    const filteredData = IncidentComputations.filteredIncidents(
      props.data,
      props.columns,
      props.categories)

    const displayedCategories = CategoryComputations.displayedCategories(
      filteredData,
      props.columns,
      props.categories,
      columnName)

    // count of items
    const itemsInCategories = displayedCategories.map( (displayed, categoryName) => {
  
      return CategoryComputations.itemsInCategory(
        filteredData,
        columnName,
        categoryName
      )
    })

    const categoryHeights = WorkspaceComputations.categoryHeights(
      props.showEmptyCategories,
      props.viewport,
      filteredData,
      props.columns,
      props.categories, 
      columnName)

    const basemapPosition = MapComputations.basemapPosition(
      props.showEmptyCategories,
      props.viewport,
      filteredData,
      props.columns,
      props.categories)

    const mapDimensions = WorkspaceComputations.mapDimensions(
      props.showEmptyCategories,
      props.viewport,
      filteredData,
      props.columns,
      props.categories)


    // TODO: Once again, not that happy accumulating height like this
    let currentY = 0

    const rightCanvasEdge = mapDimensions.get('width')
    const bundleOffsetDistance = rightCanvasEdge - Constants.getIn(['map', 'bundleOffsetDistance'])

    itemsInCategories.forEach( (count, categoryName) => {

      const categoryHeight = categoryHeights.get(categoryName)
      const categoryCount = itemsInCategories.get(categoryName)

      // The bundle region is a line 1/3 the height of the column itself,
      // parallel to it, bundleOffsetDistance away.
      // The incident paths are pulled together into the bundle region, and
      // then are allowed to fan out onto the map itself.
      // We define the top and bottom coordinates for the region
      const bundleRegionTopY = currentY + categoryHeight / 3
      const bundleRegionBottomY = currentY + categoryHeight * 2 / 3

      const subsetData = IncidentComputations.categorySubset(
        filteredData,
        columnName,
        categoryName) 


      subsetData.forEach ( (incident, index) => {

        // Don't try to draw lines for incidents without location data
        if (incident.get('longitude') === 'Not Provided' || 
          incident.get('latitude') === 'Not Provided') {
          return
        }

        if (!RenderRoutines.incidentHasFocus(incident, props)) {
          return
        }


        const bundleY = bundleRegionTopY + (bundleRegionBottomY - bundleRegionTopY) * (index / categoryCount)


        // Draw paths from incident to right bundle region
        const incidentPosition = RenderRoutines.longLatToMapCoordinates(
          incident.get('longitude'),
          incident.get('latitude'),
          basemapPosition
        )

        const departureControlPoint = RenderRoutines.radialControlPoint(props, incidentPosition)
        const curveControlThreshold = Math.abs(bundleOffsetDistance - incidentPosition.x) / Constants.get('pathCurveControlFactor')

        let x1 = incidentPosition.x
        let y1 = incidentPosition.y
        let x2 = bundleOffsetDistance
        let y2 = bundleY

        let strokeColour = RenderRoutines.fromIncidentStrokeColour(incident, props, renderContext, x1, y1, x2, y2)

        // Draw lines from incident to right bundle region
        RenderRoutines.drawBezier(
          [{
            context: renderContext,
            strokeStyle: strokeColour,
          }],

          x1,
          y1,
          
          // Control point 1, towards the edge of the map from the point
          departureControlPoint.x,
          departureControlPoint.y,

          // Control point 2, placed away from the bundle point
          bundleOffsetDistance - curveControlThreshold,
          bundleY,

          // Destination, point in the bundle group
          x2,
          y2
        )


        x1 = bundleOffsetDistance
        y1 = bundleY
        x2 = rightCanvasEdge, 
        y2 = currentY + categoryHeight * (index / categoryCount)

        strokeColour = RenderRoutines.connectorStrokeColour(incident, props)

        // paths from bundle region to column

        RenderRoutines.drawBezier(
          [{
            context: renderContext,
            strokeStyle: strokeColour,
          }],

          x1,
          y1,

          // The first control point is to the right of the incident's 
          // bundle point
          bundleOffsetDistance + 10,
          bundleY,

          // The second control point is to the left of the incident's position
          // in the column
          rightCanvasEdge - 10,
          currentY + categoryHeight * (index / categoryCount),

          // The point in the column for this incident
          x2,
          y2
        )

      })

      currentY += categoryHeight
    })
    



  },








  drawPoints(renderContext, props) {

    const filteredData = IncidentComputations.filteredIncidents(
      props.data,
      props.columns,
      props.categories)

    const basemapPosition = MapComputations.basemapPosition(
      props.showEmptyCategories,
      props.viewport,
      filteredData,
      props.columns,
      props.categories)

    const shadowColour = Constants.getIn(['map', 'shadowColour'])
    const fadedShadowColour = Chroma(shadowColour).alpha(0.1).css()

    let incidentRadius
    if (filteredData.count() > Constants.getIn(['map', 'incidentDotCountSizeCutoff'])) {
      incidentRadius = Constants.getIn(['map', 'smallIncidentRadius'])
    }
    else {
      incidentRadius = Constants.getIn(['map', 'largeIncidentRadius'])
    }

    filteredData.forEach( incident => {
      
      const incidentColour = RenderRoutines.incidentColour(incident, props)

      const incidentPosition = RenderRoutines.longLatToMapCoordinates(
        incident.get('longitude'),
        incident.get('latitude'),
        basemapPosition
      )

      // Drop shadow behind each incident

      RenderRoutines.drawCircle(
        [{
          context: renderContext, 
          fillStyle: RenderRoutines.incidentHasFocus(incident, props) ? shadowColour : fadedShadowColour,
        }],
        incidentPosition.x + 1,
        incidentPosition.y + 1,
        incidentRadius
      )



      // The incident itself
      RenderRoutines.drawCircle(
        [{
          context: renderContext, 
          fillStyle: incidentColour,
        }],
        incidentPosition.x,
        incidentPosition.y,
        incidentRadius
      )


    })


  },


  incidentHasFocus(incident, props) {

    // If we are hovering a category
    if (props.categoryHoverState.get('columnName') !== null) {
      if (CategoryComputations.itemInCategory(
        incident, 
        props.categoryHoverState.get('columnName'), 
        props.categoryHoverState.get('categoryName'))) {
        return true
      }
    }

    // If the filterbox is activated, and we are not hovering a category
    if (props.categoryHoverState.get('columnName') === null && 
      props.filterboxActivationState.get('columnName') !== null) {
      if (CategoryComputations.itemInCategory(
        incident, 
        props.filterboxActivationState.get('columnName'), 
        props.filterboxActivationState.get('categoryName'))) {
        return true
      }
    }

    if (props.hoveredIncident === incident){
      return true
    }

    if (props.selectedIncidents.contains(incident)) {
      return true
    }

    return false
  },


  incidentColour(incident, props) {

    const mapAdjacentColumns = CategoryComputations.mapAdjacentColumns(
      props.columns)

    let columnName
    if (mapAdjacentColumns.get('left') !== null) {
      columnName = mapAdjacentColumns.get('left')
    }
    else if (mapAdjacentColumns.get('right') !== null) {
      columnName = mapAdjacentColumns.get('right')
    }
    else {
      // The map is displayed with no adjacent column, so we have no way to pick
      // any colours for incidents ... 
      return Constants.getIn(['map', 'deselectedLightGrey'])
    }

    const category = IncidentComputations.firstCategoryName(Immutable.List([columnName]), incident)

    // NB: coloursForColumn returns undefined for incidents that don't have
    // a category in the system components involved column, if that column
    // happens to be next to the map
    // TODO: Convince the team that we should have a 'not applicable' category
    // for system components so that this is not necessary!
    const colour = CategoryComputations.coloursForColumn(props.data, columnName, props.schema, props.language).get(category) || '#444'

    if (RenderRoutines.incidentHasFocus(incident, props)) {
      return colour
    }
    else {
      return Chroma(colour).alpha('0.1').css()
    }

  }



}










// renderCanvas: the canvas DOM element we are drawing visible pixels to
// props: the props object from Map, which should include the main 5 state 
//   items; showEmptyCategories, viewport, data, columns, categories
//   and also: pinnedIncidents, filterboxActivationState, categoryHoverState
export default function MapRenderer (renderCanvas, props) {

  // TODO: I hope that making this draw asynchronously isn't a problem... 
  mapPromise.then( (basemapImage) => {

    const renderContext = renderCanvas.getContext('2d')

    // Clear both the displayed canvas and the input buffer
    RenderRoutines.clear(renderContext, 
      Constants.getIn(['map', 'backgroundColour']), 
      props
    )

    RenderRoutines.drawMap(renderContext, props, basemapImage)

    // Draw lines, then points, to both displayed canvas and input buffer
    RenderRoutines.drawLines(renderContext, props)
    RenderRoutines.drawPoints(renderContext, props)
  })

}


