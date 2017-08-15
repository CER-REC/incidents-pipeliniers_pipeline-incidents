const React = require('react')
const ReactRedux = require('react-redux')

//probably import incidentBar
const IncidentBar = require('./IncidentBar.jsx')
const Constants = require('../Constants.js')

class IncidentPopover extends React.Component {
  render() {
    const height = Constants.getIn(['incidentPopover', 'height'])
    const width = Constants.getIn(['incidentPopover', 'width'])
    let transformPopover = `translate(${Constants.getIn(['pinColumn','TODO'])},${Constants.getIn(['pinColumn','TODO'])})`
    return <g>

      <text x={0} y={150}
        //transform = {transformPopover}
        height = {height}
        width = {width}
        className="subpop">
        <tspan x="0" dy=".6em">INCIDENT NUMBER</tspan>
        <tspan x="0" dy="1.2em">near LOCATION</tspan>
        <tspan x="0" dy="1.2em">date reported:</tspan>
        <tspan x="0" dy="1.2em">DATE</tspan>
      </text>
      //pin icon
      //top bar thing
      //connector to the column (bar and ball/dot thing)
    </g>
    //1. transform element for the group
  }
  /**
    TODO: Should show popover when selected
    cursor should change to pointer
    popover needs to use dimensions for height and width given in Constants.js
    pinned and unpinned image needs to update depending on selection
      draws a line over the top 78x50 1px stroke
      width +5px for 'L' shape
      grey 6x6 circle from line to incidentBar
    popover colour : #888889
    popover should disappear when user clicks away
  **/

}


module.exports = IncidentPopover