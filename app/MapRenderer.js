const d3geo = require('d3-geo')

const Constants = require('./Constants.js')
const MapComputations = require('./MapComputations.js')
const IncidentComputations = require('./IncidentComputations.js')
const WorkspaceComputations = require('./WorkspaceComputations.js')
const CategoryComputations = require('./CategoryComputations.js')

// NB: The configuration of the projection here *must* match the settings used
// to produce the canada.svg, or the incidents will not be positioned
// accurately!
const projection = d3geo.geoConicEqualArea()
  .parallels([50, 70])
  .rotate([105, 0])
  .translate([279.8074028618924, 764.3666957846632])
  .scale(874.913034725085)


const RenderRoutines = {

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
    const padding = Constants.getIn(['map', 'padding'])
    const xOffset = basemapPosition.get('x')
    const yOffset = basemapPosition.get('y')
    const ratio = basemapPosition.get('ratio')

    context.strokeStyle = Constants.getIn(['map', 'lightGrey'])

    // iterate over categories
    itemsInCategories.forEach( (count, categoryName) => {

      const categoryHeight = categoryHeights.get(categoryName)
      const categoryCount = itemsInCategories.get(categoryName)

      const categoryBundleX = bundleOffsetDistance
      const categoryBundleY = currentY + categoryHeight / 2

      const subsetData = IncidentComputations.categorySubset(
        filteredData,
        columnName,
        categoryName) 


      // iterate over items in the category
      subsetData.forEach ( (incident, index) => {
        // per item, draw its line from its slot in category to bundle point to point on map (or vice versa)

        // From the wiki, on cubic bezier curves
        // The curve starts at P0 going toward P1 and arrives at P3 coming 
        // from the direction of P2

        // Draw paths from left column to bundle point
        context.beginPath()
        context.moveTo(0, currentY + categoryHeight * (index / categoryCount))

        context.bezierCurveTo(
          // The first control point is to the right of the incident's 
          // slot on the column.
          bundleOffsetDistance,
          currentY + categoryHeight * (index / categoryCount),

          // The second control point is to the left of the bundle point
          // for this category
          // TODO: For now, converge all the incidents on one point. We
          // would like to have a spread of points, rather than one
          categoryBundleX - 10,
          categoryBundleY,

          // The bundle point for this category / incident
          categoryBundleX, 
          categoryBundleY
        )
        context.stroke()

        // Draw paths from bundle point to incidents

        const projectedPosition = projection([
          incident.get('longitude'),
          incident.get('latitude')
        ])


        context.beginPath()
        // TODO: is this moveTo call strictly necesary
        // The bundle collection point
        context.moveTo(categoryBundleX, categoryBundleY)

        context.bezierCurveTo(
          // Control point 1, right of the bundle
          categoryBundleX + 10,
          categoryBundleY,

          // Control point 2, just going to drop this right on the
          // projected point

          // TODO: this should be a FUNCTION! doing it MORE THAN ONCE
          projectedPosition[0] * ratio + xOffset + padding,
          projectedPosition[1] * ratio + yOffset + padding,

          projectedPosition[0] * ratio + xOffset + padding,
          projectedPosition[1] * ratio + yOffset + padding


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
    const padding = Constants.getIn(['map', 'padding'])

    const incidentRadius = Constants.getIn(['map', 'incidentRadius'])
    const xOffset = basemapPosition.get('x')
    const yOffset = basemapPosition.get('y')
    const ratio = basemapPosition.get('ratio')


    filteredData.forEach( incident => {

      const projectedPosition = projection([
        incident.get('longitude'),
        incident.get('latitude')
      ])


      // Drop shadow behind each incident
      context.fillStyle = shadowColour
      context.beginPath()
      // x, y, radius, start angle, end angle, anticlockwise
      context.arc(
        projectedPosition[0] * ratio + xOffset + 1 + padding,
        projectedPosition[1] * ratio + yOffset + 1 + padding,
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
        projectedPosition[0] * ratio + xOffset + padding,
        projectedPosition[1] * ratio + yOffset + padding,
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










































