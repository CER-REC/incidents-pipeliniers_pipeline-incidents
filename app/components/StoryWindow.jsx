
const React = require('react')
const ReactRedux = require('react-redux')

require('./StoryWindow.scss')

const Constants = require('../Constants.js')
const StoryIndicatorDot = require('./StoryIndicatorDot.jsx')
const Tr = require('../TranslationTable.js')
const StoryComputations = require('../StoryComputations.js')
const RouteComputations = require('../RouteComputations.js')
const StoryNextImageCreator = require('../actionCreators/StoryNextImageCreator.js')
const PopupDismissedCreator = require('../actionCreators/PopupDismissedCreator.js')
const ActivateStoryImageCreator = require('../actionCreators/ActivateStoryImageCreator.js')
const SetFromRouterStateCreator = require('../actionCreators/SetFromRouterStateCreator.js')
const SetUrlFromStringCreator = require('../actionCreators/SetUrlFromStringCreator.js')

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
    this.props.analytics.reportEvent(`${Constants.getIn(['analyticsCategory','story'])}`,'Close Button')
    e.stopPropagation()
    e.preventDefault()
    this.props.onCloseButtonClicked()
  }

  tutorialImageClicked(e) {
    // Only listen to clicks if this is the last image
    // in the tutorial.
    this.props.analytics.reportEvent(`${Constants.getIn(['analyticsCategory','story'])}`,  `Click on last story image: ${this.props.story.get('storyID')}`)
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
      screenshotMode: RouteComputations.screenshotMode(window.location),
    }
    this.props.updateVisualization(storyState)
    this.props.onCloseButtonClicked()
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
      onClick = {this.closeButtonClick.bind(this)}/>
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
      onClick={this.tutorialImageClicked.bind(this)}/>
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
      className='storyWindow'>
      <svg 
        width = { this.props.viewport.get('x')} 
        height = {StoryComputations.storyWindowHeight(this.props.viewport)}>
        {this.shadowFilter()}
        {this.border()}
        {this.closeButton()}
        {this.tutorialImage(currentImageIndex, imageList)}

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
    updateVisualization: (storyState) => {
      dispatch(SetFromRouterStateCreator(storyState))
    },
    updateUrlParameters: (searchString) => {
      dispatch(SetUrlFromStringCreator(searchString))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(StoryWindow)