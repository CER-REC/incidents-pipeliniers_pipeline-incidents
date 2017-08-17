const React = require('react')
const ReactRedux = require('react-redux')

const IncidentBar = require('./IncidentBar.jsx')
const Constants = require('../Constants.js')

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

  showBorder() {
    return <svg 
      x="0" y="-12.5"
      xmlnsXlink='http://www.w3.org/1999/xlink'> 
      <line x1={0} y1={0} x2={120} y2={0} stroke="#888889"
        strokeWidth="2" /> //horizontal line
      <line x1={120} y1={0} x2={120} y2={55} 
        stroke="#888889" strokeWidth="1" /> //vertical line
      <line x1={120} y1={55} x2={125} y2={55} 
        stroke="#888889" strokeWidth="1" /> //horizontal stub
      <circle cx="127" cy="55" r="3" fill="#888889"/>
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
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(IncidentPopover)
