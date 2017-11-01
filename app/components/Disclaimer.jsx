
const React = require('react')
const ReactRedux = require('react-redux')

require('./Disclaimer.scss')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const DisclaimerDismissedCreator = require('../actionCreators/DisclaimerDismissedCreator.js')

class Disclaimer extends React.Component {

  closeButtonClick() {
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

  focus() {
    this.app.window.document.getElementById('dataDisclaimerWindow').focus()
  }

  render() {
    // Only render when summoned.
    if(!this.props.disclaimer) return null

    return <div id='dataDisclaimerWindow'
      className='disclaimerWindow'
      style={this.windowStyle()}
      tabIndex = '-1'
      role = 'dialog'
      aria-label = 'dataDisclaimer'
      aria-activedescendant='dataDisclaimerWindow'>
      <p className='disclaimer star'>*</p>      
      <p className='disclaimer disclaimerText' style={this.textStyle()}>
        {Tr.getIn(['disclaimerText', this.props.language])}
      </p>
      <svg 
        width={Constants.getIn(['disclaimer', 'closeButtonRightMargin'])}
        height={Constants.getIn(['disclaimer', 'closeButtonSize']) + 
          Constants.getIn(['disclaimer', 'closeButtonTopMargin'])}
        tabIndex = '0' role = 'button' aria-label='close button' 
        onKeyDown = {this.closeKeyDown.bind(this)}>
        <image 
          className='disclaimerCloseButton'
          width ={Constants.getIn(['disclaimer', 'closeButtonSize'])} 
          height = {Constants.getIn(['disclaimer', 'closeButtonSize'])}
          y={Constants.getIn(['disclaimer', 'closeButtonTopMargin'])}
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
    disclaimer: state.disclaimer,
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