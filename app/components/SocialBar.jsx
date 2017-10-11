const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')
const Request = require('client-request/promise')

const RouteComputations = require('../RouteComputations.js')

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

function downloadImageClick() {
  console.log('download image clicked')
}

function downloadFileClick() {

  const appRoot = RouteComputations.appRoot(document.location, store.getState().language)
  window.open(`${appRoot}data/2017-09-13 ERS TEST-joined.csv`, 'data:text/csv;charset=utf-8,data/' + escape())
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
          <g>
            <title>email</title>
            <image 
              height = {iconSize} 
              width = {iconSize}        
              y = {Constants.getIn(['socialBar', 'emailIconPadding'])}
              xlinkHref='images/email.svg'
              className="socialBarButton"
              onClick = {emailClick}></image>
          </g>
          <g>
            <title>facebook</title>
            <image 
              height = {iconSize} 
              width = {iconSize}
              y = {Constants.getIn(['socialBar', 'facebookIconPadding'])}
              xlinkHref='images/facebook.svg'
              className="socialBarButton"
              onClick = {facebookClick}></image>
          </g>
          <g>
            <title>linkedin</title>
            <image 
              height = {iconSize} 
              width = {iconSize} 
              y = {Constants.getIn(['socialBar', 'linkedinIconPadding'])}
              xlinkHref='images/linkedin.svg'
              className="socialBarButton"
              onClick = {linkedinClick}></image>
          </g>
          <g>
            <title>twitter</title>
            <image 
              height = {iconSize} 
              width = {iconSize} 
              y = {Constants.getIn(['socialBar', 'twitterIconPadding'])}
              xlinkHref='images/twitter.svg'
              className="socialBarButton"
              onClick = {twitterClick}></image>
          </g>
          <line x1={0} y1={Constants.getIn(['socialBar', 'dividerLine'])}
            x2={iconSize} y2={Constants.getIn(['socialBar', 'dividerLine'])}
            strokeWidth="1" stroke = "white" />
          <g>
            <title>download image</title>
            <image 
              height = {iconSize} 
              width = {iconSize} 
              y = {Constants.getIn(['socialBar', 'downloadImageIconPadding'])}
              xlinkHref='images/download_image.svg'
              className="socialBarButton"
              onClick = {downloadImageClick}></image>
          </g>
          <g>
            <title>download file</title>
            <image 
              height = {iconSize} 
              width = {iconSize} 
              y = {Constants.getIn(['socialBar', 'downloadIconPadding'])}
              xlinkHref='images/download_file.svg'
              className="socialBarButton"
              onClick = {downloadFileClick}></image>
          </g>
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
