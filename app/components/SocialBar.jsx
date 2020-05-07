import React from 'react'
import * as ReactRedux from 'react-redux'
import Constants from '../Constants.js'
import Request from 'client-request/promise'

import RouteComputations from '../RouteComputations.js'

import './SocialBar.scss'

import WorkspaceComputations from '../WorkspaceComputations.js'
import Tr from '../TranslationTable.js'

class SocialBar extends React.Component {
  constructor(props){
    super(props)
  }

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
          return shortenUrl
        }
        return response.body.data.url
      })
      .catch( () => shortenUrl)
  }

  emailClick() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','menuButtons'])}`,
      'selected',
      'email')
    const self = this
    this.makeBitlyPromise().then(function(url){

      const emailBody = `${url}%0A%0A ${Tr.getIn(['shareEmail', 'body', self.props.language])}`

      const emailUrl = `mailto:?subject=${Tr.getIn(['shareEmail', 'subject', self.props.language])} &body= ${emailBody}`

      window.location.href = emailUrl
    })
  }

  emailKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.emailClick()
    }
  }

  facebookClick() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','menuButtons'])}`,
      'selected',
      'facebook')
    this.makeBitlyPromise().then(function(url){
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      window.open(facebookUrl , 'targetWindow' , 'width=650,height=650')
    })
  }

  facebookKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.facebookClick()
    }
  }

  linkedinClick() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','menuButtons'])}`,
      'selected',
      'linkedin')
    this.makeBitlyPromise().then(function(url){
      const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=${url}`
      window.open(linkedinUrl , 'targetWindow' , 'width=650,height=650')
    })
  }

  linkedinKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.linkedinClick()
    }
  }

  twitterClick() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','menuButtons'])}`,
      'selected',
      'twitter')
    this.makeBitlyPromise().then(function(url){
      const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`
      window.open(twitterUrl , 'targetWindow' , 'width=650,height=650')
    })
  }

  twitterKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.twitterClick()
    }
  }

  downloadFileClick() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','menuButtons'])}`,
      'selected',
      'download data file')
    const appRoot = RouteComputations.appRoot(document.location, this.props.language)
    const fileName = Tr.getIn(['downloadable', 'csv', this.props.language])
    window.open(fileName, 'data:text/csv;charset=utf-8,data/' + escape())
  }

  downloadFileKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.downloadFileClick()
    }
  }

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
              onClick = {this.emailClick.bind(this)}
              tabIndex = '0'
              aria-label = 'email'
              role = 'button'
              onKeyDown = { this.emailKeyDown.bind(this) }></image>
          </g>
          <g>
            <title>facebook</title>
            <image
              height = {iconSize}
              width = {iconSize}
              y = {Constants.getIn(['socialBar', 'facebookIconPadding'])}
              xlinkHref='images/facebook.svg'
              className="socialBarButton"
              onClick = {this.facebookClick.bind(this) }
              tabIndex = '0'
              aria-label = 'facebook'
              role = 'button'
              onKeyDown = { this.facebookKeyDown.bind(this) }></image>
          </g>
          <g>
            <title>linkedin</title>
            <image
              height = {iconSize}
              width = {iconSize}
              y = {Constants.getIn(['socialBar', 'linkedinIconPadding'])}
              xlinkHref='images/linkedin.svg'
              className="socialBarButton"
              onClick = {this.linkedinClick.bind(this)}
              tabIndex = '0'
              aria-label = 'linkedin'
              role = 'button'
              onKeyDown = { this.linkedinKeyDown.bind(this) }></image>
          </g>
          <g>
            <title>twitter</title>
            <image
              height = {iconSize}
              width = {iconSize}
              y = {Constants.getIn(['socialBar', 'twitterIconPadding'])}
              xlinkHref='images/twitter.svg'
              className="socialBarButton"
              onClick = {this.twitterClick.bind(this)}
              tabIndex = '0'
              aria-label = 'twitter'
              role = 'button'
              onKeyDown = { this.twitterKeyDown.bind(this) }></image>
          </g>
          <line x1={0} y1={Constants.getIn(['socialBar', 'dividerLine'])}
            x2={iconSize} y2={Constants.getIn(['socialBar', 'dividerLine'])}
            strokeWidth="1" stroke = "white" />
          <g>
            <title>download data file</title>
            <image
              height = {iconSize}
              width = {iconSize}
              y = {Constants.getIn(['socialBar', 'downloadIconPadding'])}
              xlinkHref='images/download_file.svg'
              className="socialBarButton"
              onClick = {this.downloadFileClick.bind(this)}
              tabIndex = '0'
              aria-label = 'download data file'
              role = 'button'
              onKeyDown = { this.downloadFileKeyDown.bind(this) }></image>
          </g>
        </g>
      </svg>
    </div>


  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
    showEmptyCategories: state.showEmptyCategories,
    language: state.language,
    analytics: state.analytics,
  }
}



export default ReactRedux.connect(mapStateToProps)(SocialBar)
