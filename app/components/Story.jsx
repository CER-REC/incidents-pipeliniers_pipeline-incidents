
import React from 'react'
import * as ReactRedux from 'react-redux'

import './Story.scss'

import Constants from '../Constants.js'
import Tr from '../TranslationTable.js'
import PopupDismissedCreator from '../actionCreators/PopupDismissedCreator.js'
import StorySelectedCreator from '../actionCreators/StorySelectedCreator.js'

class Story extends React.Component {

  storyClicked(e) {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','story'])}`,
      'selected', 
      `${this.props.id}`)
    e.stopPropagation()
    e.preventDefault()
    this.props.onStoryClicked(this.props.id)
  }

  storyKeyDown(event) {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.storyClicked(event)
    }
  }

  render() {
    const storyWidth = this.props.viewport.get('x') * 
      Constants.getIn(['storyThumbnailDimensions', 'widthPercentage'])
    const storyHeight = this.props.viewport.get('x') * 
      Constants.getIn(['storyThumbnailDimensions', 'heightPercentage'])

    const storyStyle = {
      width: '32%',
      height: storyHeight,
    }

    // NB: .story class on this div is used for accessibility purposes, see 'tell me a story' event handlers
    return <div 
      className={`${this.props.position} story`}
      style={storyStyle}
      id={this.props.position}
      onClick = { this.storyClicked.bind(this) }
      tabIndex = '0'
      role = 'button'
      aria-label = {Tr.getIn(['stories', this.props.id, 'backgroundImage', this.props.language])}
      onKeyDown = {this.storyKeyDown.bind(this)}
      ref={ (story) => this.storySelect = story } 
      onClick = { this.storyClicked.bind(this) }>
      <svg
        width='100%'
        height={storyHeight - 
          Constants.getIn(['storyThumbnailDimensions', 'borderStroke']) * 2}>
        <image 
          xlinkHref={Tr.getIn(['stories', this.props.id, 'backgroundImage', this.props.language])}
          width='100%'
          height={storyHeight - 
            Constants.getIn(['storyThumbnailDimensions', 'borderStroke']) * 2}/>
        <rect
          className='titleContainer'
          y={storyHeight * 
            Constants.getIn(['storyThumbnailDimensions', 'titleBackgroundYOffset'])}
          width='100%'
          height='43%'/>
        <image 
          className='storyIcon'
          xlinkHref='images/eye.svg'
          x={storyWidth - 
            Constants.getIn(['storyThumbnailDimensions', 'iconOffset'])}
          y={storyHeight - 
            Constants.getIn(['storyThumbnailDimensions', 'iconOffset'])}/>
      </svg>
      <div
        className='title'>
        <p className='storiesTitle'>
          {Tr.getIn(['stories', this.props.id, 'title', this.props.language])}
        </p>
      </div>

    </div>
  }
}

const mapStateToProps = state => {
  return {
    language: state.language,
    viewport: state.viewport,
    analytics: state.analytics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStoryClicked: (storyID) => {
      dispatch(PopupDismissedCreator())
      dispatch(StorySelectedCreator(storyID))
    }
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Story)