
const React = require('react')
const ReactRedux = require('react-redux')

require('./StoryWindow.scss')

const Constants = require('../Constants.js')

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



  render() {
    return <div 
      className='storyWindow'>
      <svg 
        width = { this.props.viewport.get('x')} 
        height = { this.props.viewport.get('y') - 
           Constants.getIn(['storyThumbnailDimensions', 'windowYOffset']) + 
           Constants.getIn(['storyThumbnailDimensions', 'windowShadowOffset'])}>
        {this.shadowFilter()}
        <rect 
          width = { this.props.viewport.get('x') - 
            Constants.getIn(['storyThumbnailDimensions', 'windowShadowOffset'])} 
          height = { this.props.viewport.get('y') - 
            Constants.getIn(['storyThumbnailDimensions', 'windowYOffset'])}
          fill = '#fff'
          stroke = '#000'
          strokeWidth = '1'
          filter='url(#shadowFilter)'/>
        <image 
          className='closeButton'
          xlinkHref='images/close.svg'
          width={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
          height={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize'])}
          x={this.props.viewport.get('x') - 
            Constants.getIn(['storyThumbnailDimensions', 'windowShadowOffset']) - 
            Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize']) - 
            Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonOffset'])}
          y={Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonOffset'])}/>
      </svg>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(StoryWindow)