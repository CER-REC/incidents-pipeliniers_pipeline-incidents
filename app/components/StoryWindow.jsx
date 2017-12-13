
const React = require('react')
const ReactRedux = require('react-redux')
const ReactDOM = require('react-dom')

require('./StoryWindow.scss')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const StoryComputations = require('../StoryComputations.js')
const RouteComputations = require('../RouteComputations.js')
const PopupDismissedCreator = require('../actionCreators/PopupDismissedCreator.js')
const StoryNextImageCreator = require('../actionCreators/StoryNextImageCreator.js')
const StoryPreviousImageCreator = require('../actionCreators/StoryPreviousImageCreator.js')
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

    this.refs.storySelect.focus()

    // const last = the story then return the focus to last?
    //document.getElementById(this.story).focus()
    //ReactDOM.findDOMNode(this.props.story).focus()
    //document.querySelector('.storiesHeading').focus()
  }

  closeButtonKeyDown(event) {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.closeButtonClick(event)
    }
  }

  nextButtonClick(e) {
    this.props.analytics.reportEvent(`${Constants.getIn(['analyticsCategory','story'])}`,'Next Button')
    e.stopPropagation()
    e.preventDefault()
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()
    this.props.onNextTutorialImageClick(imageList.length)
  }

  backButtonClick(e) {
    this.props.analytics.reportEvent(`${Constants.getIn(['analyticsCategory','story'])}`,'Back Button')
    e.stopPropagation()
    e.preventDefault()
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()
    this.props.onPreviousTutorialImageClick(imageList.length)
  }

  tutorialImageClicked(e) {
    // Only listen to clicks if this is the last image
    // in the tutorial.
    this.props.analytics.reportEvent(`${Constants.getIn(['analyticsCategory','story'])}`,  `Tutorial Selected: ${this.props.story.get('storyID')}`)
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()
    if(this.props.storyImage !== imageList.length - 1) {
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
      screenshotMode: RouteComputations.screenshotMode(window.location),
    }

    this.props.updateVisualization(storyState)
  }

  tutorialImageKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      event.stopPropagation()
      this.tutorialImageClicked()
      this.props.onCloseButtonClicked()
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
      role = 'button'
      aria-label = 'story close button'
      onKeyDown = {this.closeButtonKeyDown.bind(this)}/>
  }

  leftArrow(currentImageIndex) {
    const active = (currentImageIndex < 1)? 'inactive' : 'active'
    return <image
      className={active}
      xlinkHref={`images/left-arrow-${active}.svg`}
      width={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      height={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      x={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonOffset'])}
      y={StoryComputations.storyArrowButtonY(this.props.viewport)}
      onClick={this.backButtonClick.bind(this)}/>
  }

  rightArrow(currentImageIndex, imageList) {
    const active = (currentImageIndex >= imageList.length-1)? 'inactive' : 'active'
    return <image
      className={active}
      xlinkHref={`images/right-arrow-${active}.svg`}
      width={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      height={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      x={StoryComputations.storyCloseButtonX(this.props.viewport)}
      y={StoryComputations.storyArrowButtonY(this.props.viewport)}
      onClick={this.nextButtonClick.bind(this)}/>
  }

  tutorialImage(currentImageIndex, imageList) {
    // Set the cursor to input if this is the last
    // tutorial image.
    let isActive = ''
    if(this.props.storyImage === imageList.length - 1) isActive = 'active'

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

  componentDidMount() {
    document.getElementById('storyWindowID')
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

  render() {
    // Only render if a story has been selected.
    if(!this.props.story.get('isActive')) return null
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()
    const currentImageIndex = this.props.storyImage

    return <div id = 'storyWindowID'
      className='storyWindow'
      role = 'button' tabIndex = '0' onKeyDown = {this.onEscapeKeyDown.bind(this)}>
      <svg  
        width = { this.props.viewport.get('x')} 
        height = {StoryComputations.storyWindowHeight(this.props.viewport)}>
        {this.shadowFilter()}
        {this.border()}
        {this.closeButton()}
        {this.leftArrow(currentImageIndex)}
        {this.rightArrow(currentImageIndex, imageList)}
        {this.tutorialImage(currentImageIndex, imageList)}
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

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(StoryWindow)