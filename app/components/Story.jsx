
const React = require('react')
const ReactRedux = require('react-redux')

require('./Story.scss')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const StorySelectedCreator = require('../actionCreators/StorySelectedCreator.js')

class Story extends React.Component {

  storyClicked() {
    this.props.onStoryClicked(this.props.rowName, this.props.position)
  }

  render() {
    let storyWidth = this.props.viewport.get('x') * 
                     Constants.getIn(['storyThumbnailDimensions', 'widthPercentage'])
    let storyHeight = this.props.viewport.get('x') * 
                      Constants.getIn(['storyThumbnailDimensions', 'heightPercentage'])

    let storyStyle = {
      width: '32%',
      height: storyHeight,
    }

    let backgroundImageStyle = {
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
          xlinkHref={Constants.getIn(['stories', this.props.rowName, this.props.position, 'backgroundImage'])}
          style={backgroundImageStyle}/>
        <rect
          className='titleContainer'
          y={storyHeight * Constants.getIn(['storyThumbnailDimensions', 'titleBackgroundYOffset'])}/>
        <image 
          className='storyIcon'
          xlinkHref='images/eye.svg'
          x={storyWidth - Constants.getIn(['storyThumbnailDimensions', 'iconOffset'])}
          y={storyHeight - Constants.getIn(['storyThumbnailDimensions', 'iconOffset'])}/>
      </svg>
      <div
        className='title'>
        <p className='storiesTitle'>
          {Tr.getIn(['stories', this.props.rowName, this.props.position, this.props.language])}
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
    onStoryClicked: (storyRow, storyPosition) => {
      dispatch(StorySelectedCreator(storyRow, storyPosition))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Story)