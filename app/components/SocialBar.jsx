const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')
const Request = require('client-request/promise')
const Immutable = require('immutable')

const RouteComputations = require('../RouteComputations.js')

require('./SocialBar.scss')

const WorkspaceComputations = require('../WorkspaceComputations.js')

class SocialBar extends React.Component {


  makeBitlyPromise() {
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

  emailClick() {
    this.makeBitlyPromise().then(function(response){
      const emailBody = `${response.body.data.url}%0A%0A TODO`
      const emailUrl = `mailto:?subject=TODO &body= ${emailBody}`
      window.location.href = emailUrl
    })
  }

  facebookClick() {
    this.makeBitlyPromise().then(function(response){
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${response.body.data.url}`
      window.open(facebookUrl , 'targetWindow' , 'width=650,height=650') 
    })
  }

  linkedinClick() {
    this.makeBitlyPromise().then(function(response){
      const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${response.body.data.url}&summary=${response.body.data.url}`
      window.open(linkedinUrl , 'targetWindow' , 'width=650,height=650') 
    })
  }

  twitterClick() {
    this.makeBitlyPromise().then(function(response){
      const twitterUrl = `https://twitter.com/intent/tweet?url=${response.body.data.url}`
      window.open(twitterUrl , 'targetWindow' , 'width=650,height=650') 
    })
  }

  downloadFileClick() {
    const appRoot = RouteComputations.appRoot(document.location, this.props.language)
    window.open(`${appRoot}data/2017-09-13 ERS TEST-joined.csv`, 'data:text/csv;charset=utf-8,data/' + escape())  }

  downloadImageClick() {


    const horizontalPositions = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories, 
      Immutable.Map({
        x: this.props.viewport.get('x'),
        y: Constants.get('screenshotHeight')
      }),
      this.props.data,
      this.props.columns,
      this.props.categories
    )

    // TODO: this only works in prod, need more logic to generate path to 
    // correct host in dev
    const screenshotUrl = `${window.location.origin}/${Constants.get('screenshotPath')}?pageUrl=${RouteComputations.screenshotParameter(document.location)}&width=${horizontalPositions.getIn(['workspace', 'width'])}&height=${Constants.get('screenshotHeight')}`

    window.open(screenshotUrl) 
  }


  render() {
    if (this.props.screenshotMode === true) {
      return null
    }

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
            onClick = { this.emailClick.bind(this) }></image>
          <image 
            height = {iconSize} 
            width = {iconSize}
            y = {Constants.getIn(['socialBar', 'facebookIconPadding'])}
            xlinkHref='images/facebook.svg'
            className="socialBarButton"
            onClick = { this.facebookClick.bind(this) }></image>
          <image 
            height = {iconSize} 
            width = {iconSize} 
            y = {Constants.getIn(['socialBar', 'linkedinIconPadding'])}
            xlinkHref='images/linkedin.svg'
            className="socialBarButton"
            onClick = { this.linkedinClick.bind(this) }></image>
          <image 
            height = {iconSize} 
            width = {iconSize} 
            y = {Constants.getIn(['socialBar', 'twitterIconPadding'])}
            xlinkHref='images/twitter.svg'
            className="socialBarButton"
            onClick = { this.twitterClick.bind(this) }></image>
          <line x1={0} y1={Constants.getIn(['socialBar', 'dividerLine'])}
            x2={iconSize} y2={Constants.getIn(['socialBar', 'dividerLine'])}
            strokeWidth="1" stroke = "white" />
          <image 
            height = {iconSize} 
            width = {iconSize} 
            y = {Constants.getIn(['socialBar', 'downloadImageIconPadding'])}
            xlinkHref='images/download_image.svg'
            className="socialBarButton"
            onClick = { this.downloadImageClick.bind(this) }></image>
          <image 
            height = {iconSize} 
            width = {iconSize} 
            y = {Constants.getIn(['socialBar', 'downloadIconPadding'])}
            xlinkHref='images/download_file.svg'
            className="socialBarButton"
            onClick = { this.downloadFileClick.bind(this) }></image>
        </g>
      </svg>
    </div>


  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    screenshotMode: state.screenshotMode,
    data: state.data, 
    columns: state.columns, 
    categories: state.categories,
    showEmptyCategories: state.showEmptyCategories,
    language: state.language,
  }
}



module.exports = ReactRedux.connect(mapStateToProps)(SocialBar)
