const React = require('react')
const ReactRedux = require('react-redux')

require('./StoryIndicatorDots.scss')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const StoryComputations = require('../StoryComputations.js')
const ActivateStoryImageCreator = require('../actionCreators/ActivateStoryImageCreator.js')

class StoryIndicatorDots extends React.Component {

  indicatorDotClick(e) {
    this.props.analytics.reportEvent(`${Constants.getIn(['analyticsCategory','story'])}`,'Indicator Dot Clicked')
    e.stopPropagation()

    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const currentImageIndex = this.props.storyImage
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()

    this.props.onIndicatorDotClicked(imageList[currentImageIndex])
  }

  render() {
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const currentImageIndex = this.props.storyImage
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()

    let currentX = StoryComputations.storyIndicatorDotX(this.props.viewport)
    if (imageList.length === 1) {
      currentX
    } else {
      const imageCount = imageList.length
      currentX = currentX - (Constants.getIn(['storyThumbnailDimensions', 'indicatorDotOffset']) * (imageCount - 1))
    }

    return <g>

      {imageList.map((indicatorDotIndex) => {
        currentX += Constants.getIn(['storyThumbnailDimensions', 'indicatorDotOffset'])

        let indicatorDotColour = '#d6d5d5'
        if(imageList[currentImageIndex] === indicatorDotIndex) {
          indicatorDotColour = '#5e5e5e'
        }
        return <circle
          className = 'indicatorDot'
          key = {indicatorDotIndex}
          r={ Constants.getIn(['storyThumbnailDimensions', 'indicatorDotRadius']) }
          fill = { indicatorDotColour }
          width={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
          height={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
          cx={ currentX }
          cy={StoryComputations.storyIndicatorDotY(this.props.viewport)}
          onClick = {this.indicatorDotClick.bind(this)}
          ref= { (element) => this.circle = element}
        />
      })}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    story: state.story,
    indicatorDotIndex: state.indicatorDotIndex,
    analytics: state.analytics,
    language: state.language,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIndicatorDotClicked: (indicatorDot) => {
      dispatch(ActivateStoryImageCreator(indicatorDot))
    },
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(StoryIndicatorDots)