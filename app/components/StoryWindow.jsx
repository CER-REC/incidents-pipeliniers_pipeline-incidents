
import React from 'react'
import * as ReactRedux from 'react-redux'

import './StoryWindow.scss'

import Constants from '../Constants.js'
import StoryIndicatorDot from './StoryIndicatorDot.jsx'
import Tr from '../TranslationTable.js'
import StoryComputations from '../StoryComputations.js'
import RouteComputations from '../RouteComputations.js'
import StoryNextImageCreator from '../actionCreators/StoryNextImageCreator.js'
import StoryPreviousImageCreator from '../actionCreators/StoryPreviousImageCreator.js'
import PopupDismissedCreator from '../actionCreators/PopupDismissedCreator.js'
import ActivateStoryImageCreator from '../actionCreators/ActivateStoryImageCreator.js'
import SetFromRouterStateCreator from '../actionCreators/SetFromRouterStateCreator.js'
import SetUrlFromStringCreator from '../actionCreators/SetUrlFromStringCreator.js'

class StoryWindow extends React.Component {

  shadowFilter() {
    return <defs>
      <filter id="shadowFilter" colorInterpolationFilters="sRGB">
        <feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />
        <feColorMatrix result="matrixOut" in="offOut" type="matrix"
          values="0.2 0 0 0 0.6 0 0.2 0 0 0.6 0 0 0.2 0 0.6 0 0 0 1 0" />
        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1.5" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
    </defs>
  }

  closeButtonClick(e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onCloseButtonClicked()
  }

  closeButtonKeyDown(event) {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.closeButtonClick(event)
    }
  }

  tutorialImageClicked(e) {
    // Only listen to clicks if this is the last image
    // in the tutorial.
    this.props.analytics.reportStoryNavigation(this.props.story.get('storyID'), 'right');
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()
    if(this.props.storyImage !== imageList.length - 1) {
      this.props.onNextTutorialImageClick(imageList.length)
      e.stopPropagation()
      e.preventDefault()
      return
    }

    const config = Tr.getIn(['stories', this.props.story.get('storyID'), 'config', this.props.language])

    this.props.updateUrlParameters(config)

    // Get the state from the pre-set url.
    const routerState = RouteComputations.urlParamsToState(
      document.location,
      this.props.data,
      this.props.categories)

    const storyState = {
      columns: routerState.columns,
      categories: routerState.categories,
      showEmptyCategories: routerState.showEmptyCategories,
      pinnedIncidents: routerState.pinnedIncidents,
      language: routerState.language,
      selectedIncidents: routerState.selectedIncidents,
      filterboxActivationState: routerState.filterboxActivationState,
    }
    this.props.updateVisualization(storyState)
    this.props.onCloseButtonClicked()
  }

  nextButtonClick(e) {
    this.props.analytics.reportStoryNavigation(this.props.story.get('storyID'), 'right');
    e.stopPropagation()
    e.preventDefault()
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()
    this.props.onNextTutorialImageClick(imageList.length)
  }

  nextButtonKeyDown(event) {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.nextButtonClick(event)
    }
  }

  backButtonClick(e) {
    this.props.analytics.reportStoryNavigation(this.props.story.get('storyID'), 'left');
    e.stopPropagation()
    e.preventDefault()
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()
    this.props.onPreviousTutorialImageClick(imageList.length)
  }

  previousButtonKeyDown(event) {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.backButtonClick(event)
    }
  }

  indicatorDots() {
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language])
    const currentImageIndex = this.props.storyImage

    let currentX = 0

    return imageList.map((indicatorDotImage, indicatorDotIndex) => {
      currentX += Constants.getIn(['storyThumbnailDimensions', 'indicatorDotOffset'])

      let indicatorDotColour = '#d6d5d5'
      if(indicatorDotImage === imageList.get(currentImageIndex)) {
        indicatorDotColour = '#5e5e5e'
      }

      return <StoryIndicatorDot
        indicatorDot = {indicatorDotImage}
        index={indicatorDotIndex}
        key = {indicatorDotIndex}
        xOffset = {currentX}
        dotColour = {indicatorDotColour}
      />

    }).toArray()

  }

  tutorialImageKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      event.stopPropagation()
      this.tutorialImageClicked(event)
    }
  }

  border() {
    return <rect
      width = { this.props.viewport.get('x') -
        Constants.getIn(['storyThumbnailDimensions', 'windowShadowOffset'])}
      height = { this.props.viewport.get('y') -
        Constants.getIn(['storyThumbnailDimensions', 'windowYOffset'])}
      fill = '#fff'
      stroke = '#000'
      strokeWidth = '1'
      filter='url(#shadowFilter)'/>
  }

  closeButton() {
    return <image
      className='active'
      xlinkHref='images/close.svg'
      width={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      height={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      x={StoryComputations.storyCloseButtonX(this.props.viewport)}
      y={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonOffset'])}
      onClick = {this.closeButtonClick.bind(this)}
      tabIndex = '0'
      onKeyDown = {this.closeButtonKeyDown.bind(this)}/>
  }

  leftArrow(currentImageIndex) {
    const active = (currentImageIndex < 1)? 'inactive' : 'active'
    return <image
      tabIndex = '0'
      role = 'button'
      className={active}
      xlinkHref={`images/left-arrow-${active}.svg`}
      width={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      height={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      x={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonOffset'])}
      y={StoryComputations.storyArrowButtonY(this.props.viewport)}
      onClick={this.backButtonClick.bind(this)}
      onKeyDown = {this.previousButtonKeyDown.bind(this)}/>
  }

  rightArrow(currentImageIndex, imageList) {
    const active = (currentImageIndex >= imageList.length-1)? 'inactive' : 'active'
    return <image
      tabIndex = '0'
      role = 'button'
      className={active}
      xlinkHref={`images/right-arrow-${active}.svg`}
      width={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      height={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      x={StoryComputations.storyCloseButtonX(this.props.viewport)}
      y={StoryComputations.storyArrowButtonY(this.props.viewport)}
      onClick={this.nextButtonClick.bind(this)}
      onKeyDown = {this.nextButtonKeyDown.bind(this)}/>
  }

  tutorialImage(currentImageIndex, imageList) {
    const isActive = 'active'

    return <image
      className={isActive}
      width={StoryComputations.storyTutorialImageWidth(this.props.viewport)}
      height={StoryComputations.storyTutorialImageHeight(this.props.viewport)}
      x={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonOffset']) +
        Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      y={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonOffset']) +
        Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      xlinkHref={imageList[currentImageIndex]}
      onClick={this.tutorialImageClicked.bind(this)}
      tabIndex = '0'
      role = 'button'
      onKeyDown = {this.tutorialImageKeyDown.bind(this) }/>
  }

  componentDidUpdate() {
    if(this.props.story.get('isActive')) {
      document.querySelector('.storyWindow').focus()
    }
  }

  onEscapeKeyDown(event) {
    if(event.key === 'Escape') {
      this.closeButtonClick(event)
    }
  }

  preventDismissal(e) {
    e.stopPropagation()
  }

  render() {
    // Only render if a story has been selected.
    if(!this.props.story.get('isActive')) return null
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()
    const currentImageIndex = this.props.storyImage

    return <div onClick = {this.preventDismissal.bind(this)}
      className='storyWindow'
      role = 'button' tabIndex = '0' onKeyDown = {this.onEscapeKeyDown.bind(this)}>
      <svg
        width = { this.props.viewport.get('x')}
        height = {StoryComputations.storyWindowHeight(this.props.viewport)}>
        {this.shadowFilter()}
        {this.border()}
        {this.closeButton()}
        {this.tutorialImage(currentImageIndex, imageList)}
        {this.leftArrow(currentImageIndex)}
        {this.rightArrow(currentImageIndex, imageList)}
        {this.indicatorDots()}

      </svg>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
    story: state.story,
    storyImage: state.storyImage,
    indicatorDotIndex: state.indicatorDotIndex,
    categories: state.categories,
    data: state.data,
    analytics: state.analytics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseButtonClicked: () => {
      dispatch(PopupDismissedCreator())
    },
    onNextTutorialImageClick: (count) => {
      dispatch(StoryNextImageCreator(count))
    },
    onActivateStoryImageClicked: (indicatorDotIndex) => {
      dispatch(ActivateStoryImageCreator(indicatorDotIndex))
    },
    onPreviousTutorialImageClick: (count) => {
      dispatch(StoryPreviousImageCreator(count))
    },
    updateVisualization: (storyState) => {
      dispatch(SetFromRouterStateCreator(storyState))
    },
    updateUrlParameters: (searchString) => {
      dispatch(SetUrlFromStringCreator(searchString))
    }
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(StoryWindow)
