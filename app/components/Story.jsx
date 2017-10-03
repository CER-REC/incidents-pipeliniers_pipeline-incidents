
const React = require('react')
const ReactRedux = require('react-redux')

require('./Story.scss')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const StorySelectedCreator = require('../actionCreators/StorySelectedCreator.js')

class Story extends React.Component {

  storyClicked() {
    this.props.onStoryClicked(this.props.id)
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

    const backgroundImageStyle = {
      width: '100%',
      height: storyHeight - 
              Constants.getIn(['storyThumbnailDimensions', 'borderStroke']) * 2,
    }

    return <div 
      className='story'
      style={storyStyle}
      id={this.props.position}
      onClick = { this.storyClicked.bind(this) }>
      <svg
        style={backgroundImageStyle}>
        <image 
          xlinkHref={Tr.getIn(['stories', this.props.id, 'backgroundImage', this.props.language])}
          style={backgroundImageStyle}/>
        <rect
          className='titleContainer'
          y={storyHeight * 
            Constants.getIn(['storyThumbnailDimensions', 'titleBackgroundYOffset'])}/>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStoryClicked: (storyID) => {
      dispatch(StorySelectedCreator(storyID))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Story)