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
        transform = {'translate(700,83)'} 
        xlinkHref='images/email.svg'
        onClick = {emailClick()}></image>
      <image 
        height = {iconSize} 
        width = {iconSize} 
        transform = {'translate(700,105)'} 
        xlinkHref='images/linkedin.svg'
        onClick = {linkedinClick()}></image>
      <image 
        height = {iconSize} 
        width = {iconSize} 
        transform = {'translate(700,129)'} 
        xlinkHref='images/twitter.svg'
        onClick = {twitterClick()}></image>
      <image 
        height = {iconSize} 
        width = {iconSize} 
        transform = {'translate(700,152)'} 
        xlinkHref='images/download_file.svg'
        onClick = {downloadFileClick()}></image>
      <image 
        height = {iconSize} 
        width = {iconSize} 
        transform = {'translate(700,175)'} 
        xlinkHref='images/download_image.svg'
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
