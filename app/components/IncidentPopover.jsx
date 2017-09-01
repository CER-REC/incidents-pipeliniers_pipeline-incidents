const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const CategoryComputations = require('../CategoryComputations.js')
const IncidentComputations = require('../IncidentComputations.js')
const AddPinnedIncidentCreator = require('../actionCreators/AddPinnedIncidentCreator.js')
const RemovePinnedIncidentCreator = require('../actionCreators/RemovePinnedIncidentCreator.js')

require('./IncidentPopover.scss')

const popoverX = Constants.getIn(['incidentPopover', 'popoverX'])

class IncidentPopover extends React.Component {

  horizontalLine() {
    const horizontalLineY = this.props.y
    const transformHorizontal = `translate(${popoverX},${horizontalLineY})`
    const horizontalLineEnd = Constants.getIn(['incidentPopover', 'horizontalLineEnd'])
    return <g className="horizontalLine" transform = {transformHorizontal} >
      <line x1={0} y1={0} x2={horizontalLineEnd} y2={0} strokeWidth="1" />
    </g>
  }

  showPopoverBody() {

    const pinHeight = Constants.getIn(['pinColumn', 'pinIconSize'])
    const pinWidth = Constants.getIn(['pinColumn', 'pinIconSize'])
    const showPopoverBodyY = this.props.y + Constants.getIn(['incidentPopover', 'textOffset']) 
    const transformPopoverBody = `translate(${popoverX},${showPopoverBodyY})`
    const lineHeight = Constants.getIn(['incidentPopover', 'lineHeight'])

    let imagePath = 'images/unpinned.svg'
    if(this.props.pinnedIncidents.contains(this.props.incident)) {
      imagePath = 'images/pinned.svg'
    }

    return <g transform = {transformPopoverBody}>
      <text className="subpop">
        <tspan x={0} dy=".6em">{this.props.incident.get('incidentNumber')}</tspan>
        <tspan x={0} dy={lineHeight}>Near {this.props.incident.get('nearestPopulatedCentre')}</tspan>
        <tspan x={0} dy={lineHeight}>Date reported:</tspan>
        <tspan x={0} dy={lineHeight}>{(this.props.incident.get('reportedDate').format('DD/MM/YYYY'))}</tspan>
      </text>
      <image 
        className = 'pinIcon'
        height = {pinHeight} 
        width = {pinWidth} 
        x={Constants.getIn(['incidentPopover', 'pinIconXY'])}
        y={Constants.getIn(['incidentPopover', 'pinIconXY'])}
        xlinkHref={imagePath}
        onClick={this.handlePinClick.bind(this)}></image>
    </g>
  }

  handlePinClick() {
    if(this.props.pinnedIncidents.contains(this.props.incident)) {
      this.props.unpinIncident(this.props.incident)
    }
    else {
      this.props.pinIncident(this.props.incident)
    }
  }

  showYLine() {
    // Returning the name of the [first] category that the
    // incident belongs to in the first column.
    const categoryName = IncidentComputations.firstCategoryName(this.props.columns, this.props.incident)

    // 1) Handle the case when the map is the first column. Ideally, one 
    // would want the line to connect to the incident point on the map,
    // but this is up to the design team to decide.
    // 2) Handle the case when the incident does not belong to the first
    // column.
    // 3) Handle the case when there are no columns present in the 
    // workspace. 
    // In these cases, the line will not be rendered.
    if(this.props.columns.count() === 0 ||
       categoryName === null) {
      return null
    }

    const categoryHeights = WorkspaceComputations.categoryHeights(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories, 
      this.props.columns.get(0)) 

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

    const incidents = IncidentComputations.filteredIncidents(this.props.data, this.props.columns, this.props.categories)
    const incidentsSubset = IncidentComputations.categorySubset(
      incidents, 
      this.props.columns.get(0), 
      categoryName)

    const incidentIndex = incidentsSubset.indexOf(this.props.incident)
    const y = categoryYCoordinates.get(categoryName) + categoryHeights.get(categoryName) * (incidentIndex/incidentsSubset.count())
    const transformLine = `translate(0,${y})`

    const lineHeightX = Constants.getIn(['incidentPopover', 'lineHeightX'])
    const dotRadius = Constants.getIn(['incidentPopover', 'dotRadius'])
    const showYLineY = this.props.y
    const horizontalLineXStart = Constants.getIn(['incidentPopover', 'horizontalLineXStart'])

    return <svg className="verticalLine"
      xmlnsXlink='http://www.w3.org/1999/xlink'> 
      <line x1={lineHeightX} y1={showYLineY} x2={lineHeightX} y2={y} strokeWidth="1" /> //vertical line
      <g transform = {transformLine}>
        <line x1={lineHeightX} y1={0} x2={horizontalLineXStart} y2={0} strokeWidth="1" /> //horizontal stub
        <circle cx={horizontalLineXStart} cy="0" r={dotRadius}/>
      </g>
    </svg>
  }

  render() {
    // Verify that the incident is not filtered out.
    const filteredData = IncidentComputations.filteredIncidents(
      this.props.data, 
      this.props.columns, 
      this.props.categories)
    if(!filteredData.contains(this.props.incident)) return null

    return <g>
      {this.showPopoverBody()}
      {this.horizontalLine()}
      {this.showYLine()}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    selectedIncident: state.selectedIncident,
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
    pinnedIncidents: state.pinnedIncidents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pinIncident: (incident) => {
      dispatch(AddPinnedIncidentCreator(incident))
    },
    unpinIncident: (incident) => {
      dispatch(RemovePinnedIncidentCreator(incident))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(IncidentPopover)
