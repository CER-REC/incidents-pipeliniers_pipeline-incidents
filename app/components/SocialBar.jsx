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

    const bitlyEndpoint = RouteComputations.bitlyEndpoint(document.location, this.props.language)
    const shortenUrl = RouteComputations.bitlyParameter(document.location, this.props.language)

    const options = {
      uri: `${bitlyEndpoint}?shortenUrl=${shortenUrl}`,
      json: true
    }

    return Request(options)
      .then(function (response) {
        // The server proxies our request through to Bitly. If our request
        // to our server succeeds but the one to bitly fails, the returned
        // object will detail the error

        // A reponse for a successful request to the bitly shortening service 
        // is a JSON string like:
        //{
        //  "status_code": 200,
        //  "status_txt": "OK",
        //  "data": {
        //    "url": "http://bit.ly/2xzn2HN",
        //    "hash": "2xzn2HN",
        //    "global_hash": "46frEb",
        //    "long_url": "https://www.google.ca/",
        //    "new_hash": 1
        //  }
        //}

        if (response.body.status_code !== 200) {
          // throw new Error(response.body.status_txt)
          return Constants.get('appHost')
        }
        return response.body.data.url
      })
      .catch( () => Constants.get('appHost'))
  }

  emailClick() {
    this.makeBitlyPromise().then(function(url){
      const emailBody = `${url}%0A%0A TODO`
      const emailUrl = `mailto:?subject=TODO &body= ${emailBody}`
      window.location.href = emailUrl
    })
  }

  facebookClick() {
    this.makeBitlyPromise().then(function(url){
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      window.open(facebookUrl , 'targetWindow' , 'width=650,height=650') 
    })
  }

  linkedinClick() {
    this.makeBitlyPromise().then(function(url){
      const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=${url}`
      window.open(linkedinUrl , 'targetWindow' , 'width=650,height=650') 
    })
  }

  twitterClick() {
    this.makeBitlyPromise().then(function(url){
      const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`
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

    const screenshotUrl = `${RouteComputations.screenshotOrigin(location)}/${Constants.get('screenshotPath')}/?pageUrl=${RouteComputations.screenshotParameter(document.location)}&width=${horizontalPositions.getIn(['workspace', 'width'])}&height=${Constants.get('screenshotHeight')}`

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
          <g>
            <title>email</title>
            <image 
              height = {iconSize} 
              width = {iconSize}        
              y = {Constants.getIn(['socialBar', 'emailIconPadding'])}
              xlinkHref='images/email.svg'
              className="socialBarButton"
              onClick = {this.emailClick.bind(this)}></image>
          </g>
          <g>
            <title>facebook</title>
            <image 
              height = {iconSize} 
              width = {iconSize}
              y = {Constants.getIn(['socialBar', 'facebookIconPadding'])}
              xlinkHref='images/facebook.svg'
              className="socialBarButton"
              onClick = {this.facebookClick.bind(this) }></image>
          </g>
          <g>
            <title>linkedin</title>
            <image 
              height = {iconSize} 
              width = {iconSize} 
              y = {Constants.getIn(['socialBar', 'linkedinIconPadding'])}
              xlinkHref='images/linkedin.svg'
              className="socialBarButton"
              onClick = {this.linkedinClick.bind(this)}></image>
          </g>
          <g>
            <title>twitter</title>
            <image 
              height = {iconSize} 
              width = {iconSize} 
              y = {Constants.getIn(['socialBar', 'twitterIconPadding'])}
              xlinkHref='images/twitter.svg'
              className="socialBarButton"
              onClick = {this.twitterClick.bind(this)}></image>
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
              onClick = {this.downloadImageClick.bind(this)}></image>
          </g>
          <g>
            <title>download data file</title>
            <image 
              height = {iconSize} 
              width = {iconSize} 
              y = {Constants.getIn(['socialBar', 'downloadIconPadding'])}
              xlinkHref='images/download_file.svg'
              className="socialBarButton"
              onClick = {this.downloadFileClick.bind(this)}></image>
          </g>
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
