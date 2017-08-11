const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')
const Request = require('client-request/promise')

require('../styles/Common.scss')
require('../styles/Colours.scss')
require('./SocialBar.scss')

const WorkspaceComputations = require('../WorkspaceComputations.js')

function makeBitlyPromise() {
  const options = {
    uri: `${document.location.protocol}//${document.location.host}${document.location.pathname}/bitly_url`,
    json: true
  }
  return Request(options)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      throw error
    })
}

function emailClick() {
  makeBitlyPromise().then(function(response){
    const emailBody = `${response.body.data.url}%0A%0A TODO`
    const emailUrl = `mailto:?subject=TODO &body= ${emailBody}`
    window.location.href = emailUrl
  })
}

function facebookClick() {
  makeBitlyPromise().then(function(response){
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${response.body.data.url}`
    window.open(facebookUrl , 'targetWindow' , 'width=650,height=650') 
  })
}

function linkedinClick() {
  makeBitlyPromise().then(function(response){
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${response.body.data.url}&summary=${response.body.data.url}`
    window.open(linkedinUrl , 'targetWindow' , 'width=650,height=650') 
  })
}

function twitterClick() {
  makeBitlyPromise().then(function(response){
    const twitterUrl = `https://twitter.com/intent/tweet?url=${response.body.data.url}`
    window.open(twitterUrl , 'targetWindow' , 'width=650,height=650') 
  })
}

function downloadFileClick() {
  console.log('download file clicked')
}

function downloadImageClick() {
  console.log('download image clicked')
}

class SocialBar extends React.Component {

/*
let transformString = `translate(${Constants.get('leftOuterMargin')},${Constants.get('topOuterMargin')})`
    <g transform = {transformString}>
      {homeButton()}
*/



  render() {
    const iconSize = Constants.getIn(['socialBar', 'iconSize'])
    let transformSocialIcons = `translate(${this.props.viewport.get('x') - (Constants.getIn(['socialBar', 'width']) - Constants.getIn(['socialBar', 'iconSideMargin']))},${WorkspaceComputations.topBarHeight()})`
    return <g transform = {transformSocialIcons}>
      <rect
        x={-Constants.getIn(['socialBar', 'iconSideMargin'])}
        width={ Constants.getIn(['socialBar', 'width']) }
        height={ Constants.getIn(['socialBar', 'height']) }
        fill='#555556'
      />
      <image 
        height = {iconSize} 
        width = {iconSize}        
        y =  {Constants.getIn(['socialBar', 'emailIconPadding'])}
        xlinkHref='images/email.svg'
        className="socialBar"
        onClick = {emailClick}></image>
      <image 
        height = {iconSize} 
        width = {iconSize}
        y = {Constants.getIn(['socialBar', 'facebookIconPadding'])}
        xlinkHref='images/facebook.svg'
        className="socialBar"
        onClick = {facebookClick}></image>
      <image 
        height = {iconSize} 
        width = {iconSize} 
        y = {Constants.getIn(['socialBar', 'linkedinIconPadding'])}
        xlinkHref='images/linkedin.svg'
        className="socialBar"
        onClick = {linkedinClick}></image>
      <image 
        height = {iconSize} 
        width = {iconSize} 
        y = {Constants.getIn(['socialBar', 'twitterIconPadding'])}
        xlinkHref='images/twitter.svg'
        className="socialBar"
        onClick = {twitterClick}></image>
      <image 
        height = {iconSize} 
        width = {iconSize} 
        y = {Constants.getIn(['socialBar', 'downloadIconPadding'])}
        xlinkHref='images/download_file.svg'
        className="socialBar"
        onClick = {downloadFileClick}></image>
      <image 
        height = {iconSize} 
        width = {iconSize} 
        y = {Constants.getIn(['socialBar', 'downloadImageIconPadding'])}
        xlinkHref='images/download_image.svg'
        className="socialBar"
        onClick = {downloadImageClick}></image>
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(SocialBar)
