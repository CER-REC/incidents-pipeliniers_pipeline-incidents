
const React = require('react')
const ReactRedux = require('react-redux')

require('./StoryWindow.scss')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const StoryComputations = require('../StoryComputations.js')
const StoryDismissedCreator = require('../actionCreators/StoryDismissedCreator.js')
const StoryNextImageCreator = require('../actionCreators/StoryNextImageCreator.js')
const StoryPreviousImageCreator = require('../actionCreators/StoryPreviousImageCreator.js')

class StoryWindow extends React.Component {

  shadowFilter() {
    return <defs>
      <filter id="shadowFilter" color-interpolation-filters="sRGB">
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

  nextButtonClick(e) {
    e.stopPropagation()
    e.preventDefault()
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()
    this.props.onNextTutorialImageClick(imageList.length)
  }

  backButtonClick(e) {
    e.stopPropagation()
    e.preventDefault()
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()
    this.props.onPreviousTutorialImageClick(imageList.length)
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

  leftArrow(currentImageIndex) {
    const active = (currentImageIndex < 1)? 'inactive' : 'active'
    return <image
      className={active}
      xlinkHref={'images/left-arrow-' + active + '.svg'}
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
      xlinkHref={'images/right-arrow-' + active + '.svg'}
      width={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      height={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      x={StoryComputations.storyCloseButtonX(this.props.viewport)}
      y={StoryComputations.storyArrowButtonY(this.props.viewport)}
      onClick={this.nextButtonClick.bind(this)}/>
  }

  tutorialImage(currentImageIndex, imageList) {
    return <image
      width={StoryComputations.storyTutorialImageWidth(this.props.viewport)}
      height={StoryComputations.storyTutorialImageHeight(this.props.viewport)}
      x={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonOffset']) + 
        Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      y={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonOffset']) + 
        Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      xlinkHref={imageList[currentImageIndex]}/>
  }

  render() {
    // Only render if a story has been selected.
    if(!this.props.story.get('isActive')) return null
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()
    const currentImageIndex = this.props.storyImage

    return <div 
      className='storyWindow'>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseButtonClicked: () => {
      dispatch(StoryDismissedCreator())
    },
    onNextTutorialImageClick: (count) => {
      dispatch(StoryNextImageCreator(count))
    },
    onPreviousTutorialImageClick: (count) => {
      dispatch(StoryPreviousImageCreator(count))
    },
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(StoryWindow)