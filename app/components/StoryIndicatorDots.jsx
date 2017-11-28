const React = require('react')
const ReactRedux = require('react-redux')

require('./StoryIndicatorDots.scss')

const StoryWindow = require('./StoryWindow.jsx')
const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const StoryComputations = require('../StoryComputations.js')
const RouteComputations = require('../RouteComputations.js')
const PopupDismissedCreator = require('../actionCreators/PopupDismissedCreator.js')
const ActivateStoryImageCreator = require('../actionCreators/ActivateStoryImageCreator.js')
const SetFromRouterStateCreator = require('../actionCreators/SetFromRouterStateCreator.js')
const SetUrlFromStringCreator = require('../actionCreators/SetUrlFromStringCreator.js')

class StoryIndicatorDots extends React.Component {


  indicatorDotClick(e) {
    this.props.analytics.reportEvent(`${Constants.getIn(['analyticsCategory','story'])}`,'Indicator Dot Clicked')
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()
    const currentImageIndex = this.props.storyImage
    const indicatorDot = e.target.getAttribute('data-id')
    console.log(imageList[currentImageIndex], indicatorDot)
    this.props.onActivateStoryImageClicked(indicatorDot)
  }

  render() {
    const story = Tr.getIn(['stories', this.props.story.get('storyID')])
    const currentImageIndex = this.props.storyImage
    const imageList = story.getIn(['tutorialImages', this.props.language]).toArray()

    // so don't do it like this, make a property so that each dot has the image property ID 
    // and pass it in each time so that it works

    let currentX = StoryComputations.storyIndicatorDotX(this.props.viewport)
     if (imageList.length === 1) {
       currentX
     } else {
       const imageCount = imageList.length
       currentX = currentX - (Constants.getIn(['storyThumbnailDimensions', 'indicatorDotOffset']) * (imageCount - 1))
     }

   return <g>

       {imageList.map((indicatorDot, key) => {
           currentX += Constants.getIn(['storyThumbnailDimensions', 'indicatorDotOffset'])

         let indicatorDotColour = '#d6d5d5'
           if(imageList[currentImageIndex] === indicatorDot) {
             indicatorDotColour = '#5e5e5e'
           }
           return <circle
             className = 'indicatorDot'
             data-id = {key}
             key = {indicatorDot}
             r={ Constants.getIn(['storyThumbnailDimensions', 'indicatorDotRadius']) }
             fill = { indicatorDotColour }
             width={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
             height={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
             cx={ currentX }
             cy={StoryComputations.storyIndicatorDotY(this.props.viewport)}
             onClick = {this.indicatorDotClick.bind(this)}
           />
         })}
        </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    story: state.story,
    storyImage: state.storyImage,
    analytics: state.analytics,
    language: state.language,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onActivateStoryImageClicked: (storyImageIndex) => {
      dispatch(ActivateStoryImageCreator(storyImageIndex))
    },
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(StoryIndicatorDots)