//SOCIALBAR
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

    // TODO: an issue with the social bar: it is intended to 'float along' to 
    // the left of the SVG content.
    // Doing this inside the SVG itself would be really, really hard. We may
    // just end up placing a second svg adjacent to the first, in a container
    // floated left ... 

    const measurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .get('socialBar')


    let transformContainer = `translate(${measurements.get('x') + Constants.getIn(['socialBar', 'leftMargin'])},${measurements.get('y')})`
    let transformSocialIcons = `translate(${Constants.getIn(['socialBar', 'iconSideMargin'])}, 0)`

    return <g transform = {transformContainer}>
      <rect
        width={ measurements.get('innerWidth') }
        height={ measurements.get('height') }
        fill='#555556'
      />
      <g transform = {transformSocialIcons}>
        <image 
          height = {iconSize} 
          width = {iconSize}        
          y = {Constants.getIn(['socialBar', 'emailIconPadding'])}
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
        <line x1={0} y1={Constants.getIn(['socialBar', 'dividerLine'])}
          x2={iconSize} y2={Constants.getIn(['socialBar', 'dividerLine'])}
          strokeWidth="1" stroke = "white" />
        <image 
          height = {iconSize} 
          width = {iconSize} 
          y = {Constants.getIn(['socialBar', 'downloadImageIconPadding'])}
          xlinkHref='images/download_image.svg'
          className="socialBar"
          onClick = {downloadImageClick}></image>
        <image 
          height = {iconSize} 
          width = {iconSize} 
          y = {Constants.getIn(['socialBar', 'downloadIconPadding'])}
          xlinkHref='images/download_file.svg'
          className="socialBar"
          onClick = {downloadFileClick}></image>
      </g>
    </g>
  }
}

const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(SocialBar)
