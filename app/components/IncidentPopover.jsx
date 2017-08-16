const React = require('react')
const ReactRedux = require('react-redux')

const IncidentBar = require('./IncidentBar.jsx')
const Constants = require('../Constants.js')

class IncidentPopover extends React.Component {

  showPinImage() {
    const height = Constants.getIn(['pinColumn', 'pinIconSize'])
    const width = Constants.getIn(['pinColumn', 'pinIconSize'])
    return <image 
      height = {height} 
      width = {width} 
      x="-15" y="-15" //change to constants once sure
      xlinkHref='images/unpinned.svg'></image>
  }

  showBorder() {
    return <svg 
      x="1" y="-8" //change to constants
      xmlnsXlink='http://www.w3.org/1999/xlink'> //svg height and width bigger
      <line x1={0} y1={0} x2={78} y2={0} stroke="#888889" stroke-width="1" /> //horizontal line
      <line x1={78} y1={0} x2={78} y2={55} stroke="#888889" stroke-width="1" /> //vertical line
      <line x1={78} y1={55} x2={83} y2={55} stroke="#888889" stroke-width="1" /> //horizontal stub
      <circle cx="85" cy="55" r="3" fill="#888889"/>
    </svg>
  }

  render() {
    const transformPopover = 'translate(65,170)' //dependent on location of incident in the bar?
    return <g transform = {transformPopover}>
      {this.showPinImage()}
      {this.showBorder()}
      <text
        className="subpop">

        <tspan x={0} dy=".6em">{this.props.selectedIncident.get('incidentNumber')}</tspan>

        <tspan x={0} dy="1.2em">Near LOCATION</tspan>
        <tspan x={0} dy="1.2em">Date reported:</tspan>
        <tspan x={0} dy="1.2em">DATE</tspan>
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
