const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const StoryComputations = require('../StoryComputations.js')
const ActivateStoryImageCreator = require('../actionCreators/ActivateStoryImageCreator.js')

class StoryIndicatorDot extends React.Component {

  indicatorDotClick(e) {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','story'])}`,
      'selected', 
      'TODO',
      'indicator dot')
    e.stopPropagation()
    this.props.onIndicatorDotClicked(this.props.index)
  }

  indicatorDotKeyDown(event) {
    if(event.key === ' ' || event.key === 'Enter') {
      event.stopPropagation()
      this.indicatorDotClick(event)
    }
  }

  render() {
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language])

    let currentX = StoryComputations.storyIndicatorDotX(this.props.viewport)
    if (imageList.count === 1) {
      currentX
    } else {
      const imageCount = imageList.count()
      currentX = currentX - (Constants.getIn(['storyThumbnailDimensions', 'indicatorDotOffset']) * (imageCount - 1))
    }

    return <circle tabIndex = '0' role = 'button'
      className = 'indicatorDot'
      r={ Constants.getIn(['storyThumbnailDimensions', 'indicatorDotRadius']) }
      width={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      height={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
      cy={StoryComputations.storyIndicatorDotY(this.props.viewport)}
      cx={ currentX + this.props.xOffset }
      fill = { this.props.dotColour}
      onClick = {this.indicatorDotClick.bind(this)}
      onKeyDown = {this.indicatorDotKeyDown.bind(this)}
    />
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    story: state.story,
    analytics: state.analytics,
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