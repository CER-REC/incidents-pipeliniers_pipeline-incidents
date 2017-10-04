
const React = require('react')
const ReactRedux = require('react-redux')

require('./Disclaimer.scss')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const StorySelectedCreator = require('../actionCreators/StorySelectedCreator.js')

class Disclaimer extends React.Component {

  closeButtonClick() {
    
  }

  windowStyle() {
    let disclaimerWidth = Constants.getIn(['disclaimer', 'windowMaxWidth'])
    if(disclaimerWidth / this.props.viewport.get('x') >= Constants.getIn(['disclaimer', 'disclaimerWorkspaceRatio'])) {
      disclaimerWidth = Constants.getIn(['disclaimer', 'windowMinWidth'])
    }

    return {
      maxWidth: disclaimerWidth
    }
  }

  textStyle() {
    const disclaimerWidth = Constants.getIn(['disclaimer', 'windowMaxWidth'])
    let textWidth = Constants.getIn(['disclaimer', 'textMaxWidth'])
    if(disclaimerWidth / this.props.viewport.get('x') >= Constants.getIn(['disclaimer', 'disclaimerWorkspaceRatio'])) {
      textWidth = Constants.getIn(['disclaimer', 'textMinWidth'])
    }

    return {
      maxWidth: textWidth
    }
  }

  render() {
    return <div 
      className='disclaimerWindow'
      style={this.windowStyle()}>
      <p className='disclaimer star'>*</p>      
      <p className='disclaimer disclaimerText' style={this.textStyle()}>
        {Tr.getIn(['disclaimerText', this.props.language])}
      </p>
      <svg 
        width={Constants.getIn(['disclaimer', 'closeButtonMargin'])}
        height={Constants.getIn(['disclaimer', 'closeButtonSize'])}>
        <image 
          width ={Constants.getIn(['disclaimer', 'closeButtonSize'])} 
          height = {Constants.getIn(['disclaimer', 'closeButtonSize'])}
          onClick = { this.closeButtonClick.bind(this) }
          xlinkHref = 'images/close-2.svg'>
        </image>
      </svg>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    language: state.language,
    viewport: state.viewport,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Disclaimer)