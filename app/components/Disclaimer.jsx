
const React = require('react')
const ReactRedux = require('react-redux')
const ReactDOM = require('react-dom')

require('./Disclaimer.scss')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const DisclaimerDismissedCreator = require('../actionCreators/DisclaimerDismissedCreator.js')

class Disclaimer extends React.Component {

  closeButtonClick() {
    this.props.analytics.reportEvent(`${Constants.getIn(['analyticsCategory','headerLinks'])}`,'Data Disclaimer Close Button')
    this.props.disclaimerDismissed()
  }

  closeKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'esc') {
      event.preventDefault()
      this.closeButtonClick()
    }
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

  componentDidMount() {
    
  }

  render() {
    // Only render when summoned.
    if(!this.props.disclaimer) return null

    return <div
      className='disclaimerWindow'
      style={this.windowStyle()}>
      <p className='disclaimer star'>*</p>      
      <p className='disclaimer disclaimerText' style={this.textStyle()}>
        {Tr.getIn(['disclaimerText', this.props.language])}
      </p>
      <svg 
        width={Constants.getIn(['disclaimer', 'closeButtonRightMargin'])}
        height={Constants.getIn(['disclaimer', 'closeButtonSize']) + 
          Constants.getIn(['disclaimer', 'closeButtonTopMargin'])}>
        <image 
          className='disclaimerCloseButton'
          width ={Constants.getIn(['disclaimer', 'closeButtonSize'])} 
          height = {Constants.getIn(['disclaimer', 'closeButtonSize'])}
          y={Constants.getIn(['disclaimer', 'closeButtonTopMargin'])}
          onClick = { this.closeButtonClick.bind(this) }
          tabIndex = '0' aria-label = 'close'
          onKeyDown = {this.closeKeyDown.bind(this)}
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
    disclaimer: state.disclaimer,
    analytics: state.analytics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    disclaimerDismissed: () => {
      dispatch(DisclaimerDismissedCreator())
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Disclaimer)