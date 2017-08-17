const React = require('react')
const ReactRedux = require('react-redux')

const IncidentBar = require('./IncidentBar.jsx')
const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const CategoryComputations = require('../CategoryComputations.js')
const IncidentComputations = require('../IncidentComputations.js')

require('../styles/Colours.scss')

class IncidentPopover extends React.Component {

  horizontalLine() {
    const transformHorizontal = 'translate(0,-12.5)'
    return <g transform = {transformHorizontal}>
      <line x1={0} y1={0} x2={120} y2={0} stroke="#888889"
        strokeWidth="1" /> //horizontal line
    </g>
  }

  showPopoverBody() {

    const pinHeight = Constants.getIn(['pinColumn', 'pinIconSize'])
    const pinWidth = Constants.getIn(['pinColumn', 'pinIconSize'])

    return <g>
      
      <text
        className="subpop">
        <tspan x={0} dy=".6em">{this.props.selectedIncident.get('incidentNumber')}</tspan>
        <tspan x={0} dy="1.2em">Near {this.props.selectedIncident.get('nearestPopulatedCentre')}</tspan>
        <tspan x={0} dy="1.2em">Date reported:</tspan>
        <tspan x={0} dy="1.2em">{(this.props.selectedIncident.get('reportedDate').format('DD/MM/YYYY'))}</tspan>
      </text>
      <image 
        height = {pinHeight} 
        width = {pinWidth} 
        x={Constants.getIn(['incidentPopover', 'pinIconXY'])}
        y={Constants.getIn(['incidentPopover', 'pinIconXY'])}
        xlinkHref='images/unpinned.svg'></image>
    </g>
  }

  //TODO: handle the case where no columns are displayed
  //TODO: what happens if the leftmost column is the map? 
  showYLine() {
    const categoryHeights = WorkspaceComputations.categoryHeights(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories, 
      this.props.columns.get(0)) 
    //console.log(categoryHeights.toJS())

    // TODO: I'm not very happy computing the vertical layout this way, refactor!
    let categoryY = WorkspaceComputations.columnY()

    const displayedCategories = CategoryComputations.displayedCategories(
      this.props.data,
      this.props.columns,
      this.props.categories, 
      this.props.columns.get(0))

    const categoryYCoordinates = displayedCategories
      .map( (visible, categoryName) => {
        const currentY = categoryY
        categoryY += categoryHeights.get(categoryName)

        return currentY
      })
    //console.log(categoryYCoordinates.toJS())


    const categoryName = this.props.selectedIncident.get(this.props.columns.get(0))

    const incidents = IncidentComputations.filteredIncidents(this.props.data, this.props.columns, this.props.categories)
    const incidentsSubset = IncidentComputations.categorySubset(
      incidents, 
      this.props.columns.get(0), 
      categoryName)

    //console.log(categoryName)

    const incidentIndex = incidentsSubset.indexOf(this.props.selectedIncident)
    const y = categoryYCoordinates.get(categoryName) + categoryHeights.get(categoryName) * (incidentIndex/incidentsSubset.count())
    //let transformLine = `translate(0,${y})`

    console.log(y, categoryYCoordinates.get(categoryName), categoryHeights.get(categoryName), incidentIndex, incidentsSubset.count())
    return <svg y="-12" 
      xmlnsXlink='http://www.w3.org/1999/xlink'> 
      <g> 
        <line x1={120} y1={0} x2={120} y2={y} 
          stroke="#888889" strokeWidth="1" /> //vertical line
      </g>
    </svg>
  }
  showStub() {
    //will eventually be dependent on y - return y somehow
    //const transformStub = `translate(0, ${y})`
    return <g>
      <line x1={120} y1={0} x2={125} y2={0} 
        stroke="#888889" strokeWidth="1" />
      <circle cx="127" cy="0" r="3" fill="#888889"/>
    </g>
  }

  /*
 <g transform = {transformLine}>
        <line x1={120} y1={0} x2={125} y2={0} 
          stroke="#888889" strokeWidth="1" /> //horizontal stub
        <circle cx="127" cy="0" r="3" fill="#888889"/>
      </g>
  */

  render() {
    const transformPopover = 'translate(25,170)'
    return <g transform = {transformPopover}>
      {this.showPopoverBody()}
      {this.horizontalLine()}
      {this.showYLine()}
      {this.showStub()}
    </g>
  }
  // 
  /**
    TODO: Should show popover when selected
    cursor should change to pointer
    pinned and unpinned image needs to update depending on selection
    popover should disappear when user clicks away
  **/

}

const mapStateToProps = state => {
  return {
    selectedIncident: state.selectedIncident,
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,

  }
}

module.exports = ReactRedux.connect(mapStateToProps)(IncidentPopover)
