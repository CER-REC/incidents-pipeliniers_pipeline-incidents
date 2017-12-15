const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const StoryComputations = require('../StoryComputations.js')
const ActivateStoryImageCreator = require('../actionCreators/ActivateStoryImageCreator.js')

class StoryIndicatorDot extends React.Component {

  indicatorDotClick(e) {
    this.props.analytics.reportEvent(`${Constants.getIn(['analyticsCategory','story'])}`,'Indicator Dot Clicked')
    e.stopPropagation()
    this.props.onIndicatorDotClicked(this.props.index)
  }

  render() {
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const currentImageIndex = this.props.storyImage
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()

    const indicatorDotIndex = this.props.index

    let currentX = StoryComputations.storyIndicatorDotX(this.props.viewport)
    if (imageList.length === 1) {
      currentX
    } else {
      const imageCount = imageList.length
      currentX = currentX - (Constants.getIn(['storyThumbnailDimensions', 'indicatorDotOffset']) * (imageCount - 1))
    }

    return <circle
      className = 'indicatorDot'
      key = {indicatorDotIndex}
      id = {indicatorDotIndex}
      r={ Constants.getIn(['storyThumbnailDimensions', 'indicatorDotRadius']) }
      width={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      height={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      cy={StoryComputations.storyIndicatorDotY(this.props.viewport)}
      cx={ currentX + this.props.xOffset }
      fill = { this.props.dotColor}
      onClick = {this.indicatorDotClick.bind(this)}
    />
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    story: state.story,
    analytics: state.analytics,
    storyImage: state.storyImage,
    language: state.language,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIndicatorDotClicked: (storyImage) => {
      dispatch(ActivateStoryImageCreator(storyImage))
    },
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(StoryIndicatorDot)