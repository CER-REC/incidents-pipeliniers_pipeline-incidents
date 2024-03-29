import React from 'react'
import * as ReactRedux from 'react-redux'

import Constants from '../Constants.js'
import ShowIncidentListCreator from '../actionCreators/ShowIncidentListCreator.js'
import WorkspaceComputations from '../WorkspaceComputations.js'
import Tr from '../TranslationTable.js'

import '../styles/Common.scss'


class IncidentListShowHide extends React.Component {

  rotateImage() {
    const rotateHideImage = `rotate(${Constants.getIn(['pinColumn','chevron90Rotation'])} ${Constants.getIn(['pinColumn','hideIncidentListX'])} ${Constants.getIn(['pinColumn','hideIncidentListY'])})`
    const rotateSeeImage = `rotate(${Constants.getIn(['pinColumn','chevron270Rotation'])} ${Constants.getIn(['pinColumn','showIncidentListXY'])} ${Constants.getIn(['pinColumn','showIncidentListXY'])})`
    if(this.props.showIncidentList) {
      return rotateHideImage
    } else {
      return rotateSeeImage
    }
  }

  showImage() {
    const height = Constants.getIn(['pinColumn', 'labelIconSize'])
    const width = Constants.getIn(['pinColumn', 'labelIconSize'])

    const transformShowImage = `translate(0, ${-Constants.getIn(['showHideEmptyCategories','fontSize'])})`

    return <image 
      x = { Constants.getIn(['pinColumn', 'labelIconPadding']) }
      height = {height} 
      width = {width} 
      transform = {transformShowImage} 
      xlinkHref='images/button-down.svg'
      transform={ this.rotateImage() }>
    </image>
  }
  
  showText() {
    const xShowText = Constants.getIn(['showHideEmptyCategories', 'xShowText'])
    if(this.props.showIncidentList) {
      return <text x={xShowText} y={0} className="emptyCategories">
        <tspan>{ Tr.getIn(['hideIncidentList', this.props.language]) }</tspan>
      </text>

    }
    else {

      return <text x={xShowText} y={0} className="emptyCategories">
        <tspan>{ Tr.getIn(['showIncidentList', this.props.language]) }</tspan>
      </text>
    }
  }


  showTextKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.props.onClick()
    }
  }

  incidentListShowHideAnalytics() {
    const actionString = this.props.showIncidentList ? 'Hide List' : 'Show List'
    this.props.analytics.reportShowHideMenu(actionString);
    this.props.onClick(
      this.props.showImage,
      this.props.showText)
  }

  render() {
    // this with the drag arrows. 
    const yTransform = WorkspaceComputations.dragArrowY(this.props.viewport) - Constants.getIn(['pinColumn', 'labelPadding'])

    let transformShowHide = `translate(${Constants.get('showHideLeftMargin')}, ${yTransform})`
    return ( 

      <g transform = {transformShowHide} onClick={this.incidentListShowHideAnalytics.bind(this)} className="emptyCategories">
        <g className = 'incidentListShowHide'
          tabIndex = '0'
          role = 'button'
          aria-label = {Tr.getIn(['showIncidentList', this.props.language])}
          onKeyDown = { this.showTextKeyDown.bind(this) }> 
          {this.showText()}
        </g>
        <g>
          {this.showImage()}
        </g>
      </g>
    )
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
    showIncidentList: state.showIncidentList,
    analytics: state.analytics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(ShowIncidentListCreator())
    }
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(IncidentListShowHide)


