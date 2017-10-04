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

  render() {

    const iconSize = Constants.getIn(['socialBar', 'iconSize'])

    const measurements = WorkspaceComputations.socialBarMeasurements(this.props.viewport)

    const transformSocialIcons = `translate(${Constants.getIn(['socialBar', 'iconSideMargin'])}, 0)`

    const containerStyle = {
      position: 'absolute',
      left: measurements.get('x'), 
      top: measurements.get('y'), 
    }

    return <div style = { containerStyle }>
      <svg>
        <rect
          width={ measurements.get('innerWidth') }
          height={ measurements.get('height') }
          className = 'socialBarBackground'
        />
        <g transform = {transformSocialIcons}>
          <image 
            height = {iconSize} 
            width = {iconSize}        
            y = {Constants.getIn(['socialBar', 'emailIconPadding'])}
            xlinkHref='images/email.svg'
            className="socialBarButton"
            onClick = {emailClick}></image>
          <image 
            height = {iconSize} 
            width = {iconSize}
            y = {Constants.getIn(['socialBar', 'facebookIconPadding'])}
            xlinkHref='images/facebook.svg'
            className="socialBarButton"
            onClick = {facebookClick}></image>
          <image 
            height = {iconSize} 
            width = {iconSize} 
            y = {Constants.getIn(['socialBar', 'linkedinIconPadding'])}
            xlinkHref='images/linkedin.svg'
            className="socialBarButton"
            onClick = {linkedinClick}></image>
          <image 
            height = {iconSize} 
            width = {iconSize} 
            y = {Constants.getIn(['socialBar', 'twitterIconPadding'])}
            xlinkHref='images/twitter.svg'
            className="socialBarButton"
            onClick = {twitterClick}></image>
          <line x1={0} y1={Constants.getIn(['socialBar', 'dividerLine'])}
            x2={iconSize} y2={Constants.getIn(['socialBar', 'dividerLine'])}
            strokeWidth="1" stroke = "white" />
          <image 
            height = {iconSize} 
            width = {iconSize} 
            y = {Constants.getIn(['socialBar', 'downloadImageIconPadding'])}
            xlinkHref='images/download_image.svg'
            className="socialBarButton"
            onClick = {downloadImageClick}></image>
          <image 
            height = {iconSize} 
            width = {iconSize} 
            y = {Constants.getIn(['socialBar', 'downloadIconPadding'])}
            xlinkHref='images/download_file.svg'
            className="socialBarButton"
            onClick = {downloadFileClick}></image>
        </g>
      </svg>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(SocialBar)
