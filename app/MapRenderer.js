const D3geo = require('d3-geo')

const Constants = require('./Constants.js')
const MapComputations = require('./MapComputations.js')
const IncidentComputations = require('./IncidentComputations.js')
const WorkspaceComputations = require('./WorkspaceComputations.js')
const CategoryComputations = require('./CategoryComputations.js')

// NB: The configuration of the projection here *must* match the settings used
// to produce the canada.svg, or the incidents will not be positioned
// accurately!
// See the Canada-Geoprojection repository associated with this project.
const projection = D3geo.geoConicEqualArea()
  .parallels([50, 70])
  .rotate([105, 0])
  .translate([279.8074028618924, 764.3666957846632])
  .scale(874.913034725085)


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
  // TODO: at least I sure hope it's going to work this way =/

  // props: the Map properties object
  // incidentPoint: a plain javascript object with x, y, map coordinates as
  //   prepared by longLatToMapCoordinates
  radialControlPoint(props, incidentPoint) {

    const basemapCentre = MapComputations.basemapCentre(
      props.showEmptyCategories,
      props.viewport,
      props.data,
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

    // define the new point some distance along the line
    return {
      x: basemapCentre.get('x') + Math.cos(angle) * (distance + radialControlPointDistance),
      y: basemapCentre.get('y') + Math.sin(angle) * (distance + radialControlPointDistance),
    }

  },




  clear(context, props) {

    const mapDimensions = WorkspaceComputations.mapDimensions(
      props.showEmptyCategories,
      props.viewport,
      props.data,
      props.columns,
      props.categories)

    context.fillStyle = Constants.getIn(['map', 'backgroundColour'])
    context.fillRect(
      0,
      0,
      mapDimensions.get('width'),
      mapDimensions.get('height')
    )

  },

  drawMap(context, props) {
    const basemapImage = document.getElementById('canadaImage')
    const padding = Constants.getIn(['map', 'padding'])

    const basemapPosition = MapComputations.basemapPosition(
      props.showEmptyCategories,
      props.viewport,
      props.data,
      props.columns,
      props.categories)

    // TODO:
    // I hope there are no race conditions associated with loading the
    // image. may need to manage that ourselves.
    context.drawImage(basemapImage, 
      basemapPosition.get('x') + padding,
      basemapPosition.get('y') + padding,
      basemapPosition.get('width'),
      basemapPosition.get('height')
    )
    
  },

  drawLines(context, props) {
    
    const mapAdjacentColumns = CategoryComputations.mapAdjacentColumns(
      props.columns)

    if (mapAdjacentColumns.get('left') !== null) {
      RenderRoutines.drawLeftLines(context, props, mapAdjacentColumns.get('left'))
    }

    // if (mapAdjacentColumns.get('right') !== null) {
    //   RenderRoutines.drawRightLines(context, props, mapAdjacentColumns.get('right'))
    // }

  },


  drawLeftLines(context, props, columnName) {

    const filteredData = IncidentComputations.filteredIncidents(
      props.data,
      props.columns,
      props.categories)

    const displayedCategories = CategoryComputations.displayedCategories(
      props.data,
      props.columns,
      props.categories,
      columnName)

    // count of items
    const itemsInCategories = displayedCategories.map( (displayed, categoryName) => {
  
      return CategoryComputations.itemsInCategory(
        props.data,
        columnName,
        categoryName
      )
    })

    const categoryHeights = WorkspaceComputations.categoryHeights(
      props.showEmptyCategories,
      props.viewport,
      props.data,
      props.columns,
      props.categories, 
      columnName) 

    const basemapPosition = MapComputations.basemapPosition(
      props.showEmptyCategories,
      props.viewport,
      props.data,
      props.columns,
      props.categories)


    // TODO: Once again, not that happy accumulating height like this
    let currentY = 0

    const bundleOffsetDistance = Constants.getIn(['map', 'bundleOffsetDistance'])

    context.strokeStyle = Constants.getIn(['map', 'lightGrey'])

    itemsInCategories.forEach( (count, categoryName) => {

      const categoryHeight = categoryHeights.get(categoryName)
      const categoryCount = itemsInCategories.get(categoryName)

      // The bundle region is a line 1/2 the height of the column itself,
      // parallel to it, bundleOffsetDistance away.
      // The incident paths are pulled together into the bundle region, and
      // then are allowed to fan out onto the map itself.
      // We define the top and bottom coordinates for the region
      // TODO: These parameters may need tweaking
      const bundleRegionTopY = currentY + categoryHeight / 4
      const bundleRegionBottomY = currentY + categoryHeight * 3 / 4

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

        const bundleY = bundleRegionTopY + (bundleRegionBottomY - bundleRegionTopY) * (index / categoryCount)

        // From the wiki, on cubic bezier curves
        // The curve starts at P0 going toward P1 and arrives at P3 coming 
        // from the direction of P2

        // Draw paths from left column to bundle region
        context.beginPath()
        context.moveTo(0, currentY + categoryHeight * (index / categoryCount))

        context.bezierCurveTo(
          // The first control point is to the right of the incident's 
          // slot on the column.
          bundleOffsetDistance,
          currentY + categoryHeight * (index / categoryCount),

          // The second control point is to the left of the bundle point
          // for this incident
          bundleOffsetDistance - 10,
          bundleY,

          // The bundle point for this incident
          bundleOffsetDistance, 
          bundleY
        )
        context.stroke()



        // Draw paths from bundle region to incidents on map
        const incidentPosition = RenderRoutines.longLatToMapCoordinates(
          incident.get('longitude'),
          incident.get('latitude'),
          basemapPosition
        )

        const destinationControlPoint = RenderRoutines.radialControlPoint(props, incidentPosition)

        context.beginPath()
        // The incident's point in the bundle region
        context.moveTo(bundleOffsetDistance, bundleY)

        context.bezierCurveTo(
          // Control point 1, right of the bundle
          bundleOffsetDistance + 10,
          bundleY,

          // Control point 2, placed away from the destination point
          destinationControlPoint.x,
          destinationControlPoint.y,

          incidentPosition.x,
          incidentPosition.y
        )
        context.stroke()





      })


      currentY += categoryHeight
    })



    
  },


  // hold that thought

  // drawRightLines(context, props, columnName) {

  //   const displayedCategories = CategoryComputations.displayedCategories(
  //     props.data,
  //     props.columns,
  //     props.categories,
  //     props.columnName
  //   ).get(columnName)

  //   CategoryComputations.itemsInCategory(
  //     props.data,
  //     columnName
  //   )

  //   // draw paths from incident to right bundle point
  //   // draw paths from bundle point to right column
  // },








  drawPoints(context, props) {

    const basemapPosition = MapComputations.basemapPosition(
      props.showEmptyCategories,
      props.viewport,
      props.data,
      props.columns,
      props.categories)

    const filteredData = IncidentComputations.filteredIncidents(
      props.data,
      props.columns,
      props.categories)

    const incidentColour = Constants.getIn(['map', 'incidentCircleColour'])
    const shadowColour = Constants.getIn(['map', 'shadowColour'])
    const incidentRadius = Constants.getIn(['map', 'incidentRadius'])

    filteredData.forEach( incident => {

      const incidentPosition = RenderRoutines.longLatToMapCoordinates(
        incident.get('longitude'),
        incident.get('latitude'),
        basemapPosition
      )



      // Drop shadow behind each incident
      context.fillStyle = shadowColour
      context.beginPath()
      // x, y, radius, start angle, end angle, anticlockwise
      context.arc(
        incidentPosition.x + 1,
        incidentPosition.y + 1,
        incidentRadius,
        0,
        2 * Math.PI
      )
      context.fill()



      // The incident itself
      context.fillStyle = incidentColour
      context.beginPath()
      // x, y, radius, start angle, end angle, anticlockwise
      context.arc(
        incidentPosition.x,
        incidentPosition.y,
        incidentRadius,
        0,
        2 * Math.PI
      )
      context.fill()








    })


  },


}










// canvas: the canvas DOM element we are rendering to
// props: the props object from Map, which should include the main 5 state 
// items: showEmptyCategories, viewport, data, columns, categories
module.exports = function MapRenderer (canvas, props) {

  const context = canvas.getContext('2d')

  RenderRoutines.clear(context, props)

  RenderRoutines.drawMap(context, props)
  //   also clear input buffers? 

  RenderRoutines.drawLines(context, props)
  //   also draw to the line input buffer

  RenderRoutines.drawPoints(context, props)
  //   also draw to the point input buffer

}










































