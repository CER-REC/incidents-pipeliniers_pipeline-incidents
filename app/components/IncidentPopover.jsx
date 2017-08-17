const React = require('react')
const ReactRedux = require('react-redux')

const IncidentBar = require('./IncidentBar.jsx')
const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const CategoryComputations = require('../CategoryComputations.js')

require('../styles/Colours.scss')

class IncidentPopover extends React.Component {

  showPinImage() {
    const height = Constants.getIn(['pinColumn', 'pinIconSize'])
    const width = Constants.getIn(['pinColumn', 'pinIconSize'])
    return <image 
      height = {height} 
      width = {width} 
      x={Constants.getIn(['incidentPopover', 'pinIconXY'])}
      y={Constants.getIn(['incidentPopover', 'pinIconXY'])}
      xlinkHref='images/unpinned.svg'></image>
  }

  //TODO: handle the case where no columns are displayed
  //TODO: what happens if the leftmost column is the map? 
  showBorder() {
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
      }).toJS()
      console.log(categoryYCoordinates)

    //TODO: figuring out the category heights
    //where our incident is in our category for height
    //applying that to the graphics

    return <svg 
      x="0" y="-12.5"
      xmlnsXlink='http://www.w3.org/1999/xlink'> 
      <line x1={0} y1={0} x2={120} y2={0} stroke="#888889"
        strokeWidth="2" /> //horizontal line
      <line x1={120} y1={0} x2={120} y2={55} 
        stroke="#888889" strokeWidth="1" /> //vertical line
      <g transform = 'translate(0,55)'>
        <line x1={120} y1={0} x2={125} y2={0} 
          stroke="#888889" strokeWidth="1" /> //horizontal stub
        <circle cx="127" cy="0" r="3" fill="#888889"/>
      </g>
    </svg>
  }

  render() {
    const transformPopover = 'translate(25,170)' //dependent on location of incident in the bar?
    return <g transform = {transformPopover}>
      {this.showPinImage()}
      {this.showBorder()}
      <text
        className="subpop">
        <tspan x={0} dy=".6em">{this.props.selectedIncident.get('incidentNumber')}</tspan>
        <tspan x={0} dy="1.2em">Near {this.props.selectedIncident.get('nearestPopulatedCentre')}</tspan>
        <tspan x={0} dy="1.2em">Date reported:</tspan>
        <tspan x={0} dy="1.2em">{(this.props.selectedIncident.get('reportedDate').format('DD/MM/YYYY'))}</tspan>
      </text>
    </g>
  }
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
