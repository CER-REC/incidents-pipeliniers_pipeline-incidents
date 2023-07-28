
import React from 'react'
import * as ReactRedux from 'react-redux'

import './Disclaimer.scss'

import Constants from '../Constants.js'
import Tr from '../TranslationTable.js'
import DisclaimerDismissedCreator from '../actionCreators/DisclaimerDismissedCreator.js'

class Disclaimer extends React.Component {

  closeButtonClick() {
    this.props.disclaimerDismissed()
    document.querySelector('.dataDisclaimerText').focus()
  }

  closeKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
      event.preventDefault()
      this.closeButtonClick()
    }
  }

  closeButton() {
    return <img
      className='disclaimerCloseButton'
      onClick = { this.closeButtonClick.bind(this) }
      src = 'images/close-2.svg'>
    </img>
  }

  windowStyle() {
    let disclaimerWidth = Constants.getIn(['disclaimer', 'windowMaxWidth'])
    if(disclaimerWidth / this.props.viewport.get('x') >= Constants.getIn(['disclaimer', 'disclaimerWorkspaceRatio'])) {
      disclaimerWidth = Constants.getIn(['disclaimer', 'windowMinWidth'])
    }

    return {
      maxWidth: disclaimerWidth
    }
  }

  textStyle() {
    const disclaimerWidth = Constants.getIn(['disclaimer', 'windowMaxWidth'])
    let textWidth = Constants.getIn(['disclaimer', 'textMaxWidth'])
    if(disclaimerWidth / this.props.viewport.get('x') >= Constants.getIn(['disclaimer', 'disclaimerWorkspaceRatio'])) {
      textWidth = Constants.getIn(['disclaimer', 'textMinWidth'])
    }

    return {
      maxWidth: textWidth
    }
  }

  componentDidUpdate() {
    if(this.props.disclaimer) {
      const disclaimer = document.querySelector('.disclaimerCloseButton')
      disclaimer.focus()
      window.scrollTo(0,0)
    }
  }

  preventDismissal(e) {
    e.stopPropagation()
  }

  render() {
    // Only render when summoned.
    if(!this.props.disclaimer) return null

    return <div onClick = {this.preventDismissal.bind(this)}
      id = {Constants.get('disclaimerID')}
      className='disclaimerWindow'
      style={this.windowStyle()}> 
      {this.closeButton()}
      <p className='disclaimer star'>*</p>      
      <p className='disclaimer disclaimerText' style={this.textStyle()}>
        {Tr.getIn(['disclaimerText', this.props.language])}
      </p>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    language: state.language,
    viewport: state.viewport,
    disclaimer: state.disclaimer,
    analytics: state.analytics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    disclaimerDismissed: () => {
      dispatch(DisclaimerDismissedCreator())
    }
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Disclaimer)