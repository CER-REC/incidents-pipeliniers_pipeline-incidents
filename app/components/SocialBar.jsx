const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')

require('../styles/Common.scss')
require('../styles/Colours.scss')
require('./SocialBar.scss')

const WorkspaceComputations = require('../WorkspaceComputations.js')

function emailClick() {
  console.log('email clicked')
}

function linkedinClick() {
  console.log('linkedin clicked')
}

function twitterClick() {
  console.log('twitter clicked')
}

function downloadFileClick() {
  console.log('download file clicked')
}

function downloadImageClick() {
  console.log('download image clicked')
}

class SocialBar extends React.Component {

  render() {
    const iconSize = Constants.getIn(['socialBar', 'iconSize'])
    return <g>
      <rect
        x={ this.props.viewport.get('x') - Constants.getIn(['socialBar', 'width']) }
        y={ WorkspaceComputations.topBarHeight() }
        width={ Constants.getIn(['socialBar', 'width']) }
        height={ Constants.getIn(['socialBar', 'height']) }
        fill='#555556'
      />
      <image 
        height = {iconSize} 
        width = {iconSize}
        x = {this.props.viewport.get('x') - (Constants.getIn(['socialBar', 'width']) - Constants.getIn(['socialBar', 'iconSideMargin']))}
        y = {WorkspaceComputations.topBarHeight() + Constants.getIn(['socialBar', 'emailIconPadding'])}
        xlinkHref='images/email.svg'
        className="socialBar"
        onClick = {emailClick()}></image>
      <image 
        height = {iconSize} 
        width = {iconSize} 
        x = {this.props.viewport.get('x') - (Constants.getIn(['socialBar', 'width']) - Constants.getIn(['socialBar', 'iconSideMargin']))}
        y = {WorkspaceComputations.topBarHeight() + Constants.getIn(['socialBar', 'linkedinIconPadding'])}
        xlinkHref='images/linkedin.svg'
        className="socialBar"
        onClick = {linkedinClick()}></image>
      <image 
        height = {iconSize} 
        width = {iconSize} 
        x = {this.props.viewport.get('x') - (Constants.getIn(['socialBar', 'width']) - Constants.getIn(['socialBar', 'iconSideMargin']))}
        y = {WorkspaceComputations.topBarHeight() + Constants.getIn(['socialBar', 'twitterIconPadding'])}
        xlinkHref='images/twitter.svg'
        className="socialBar"
        onClick = {twitterClick()}></image>
      <image 
        height = {iconSize} 
        width = {iconSize} 
        x = {this.props.viewport.get('x') - (Constants.getIn(['socialBar', 'width']) - Constants.getIn(['socialBar', 'iconSideMargin']))}
        y = {WorkspaceComputations.topBarHeight() + Constants.getIn(['socialBar', 'downloadIconPadding'])}
        xlinkHref='images/download_file.svg'
        className="socialBar"
        onClick = {downloadFileClick()}></image>
      <image 
        height = {iconSize} 
        width = {iconSize} 
        x = {this.props.viewport.get('x') - (Constants.getIn(['socialBar', 'width']) - Constants.getIn(['socialBar', 'iconSideMargin']))}
        y = {WorkspaceComputations.topBarHeight() + Constants.getIn(['socialBar', 'downloadImageIconPadding'])}
        xlinkHref='images/download_image.svg'
        className="socialBar"
        onClick = {downloadImageClick()}></image>
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(SocialBar)
