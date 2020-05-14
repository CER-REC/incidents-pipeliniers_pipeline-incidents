import React from 'react'
import RouteComputations from '../RouteComputations.js'
import Tr from '../TranslationTable.js'
import './LoadingOverlay.scss'

class LoadingOverlay extends React.Component {
  render() {
    const language = RouteComputations.parseUrlLanguage(document.location);
    const title = Tr.getIn(['shareEmail', 'subject', language])
    const subtitle = Tr.getIn(['loadingOverlayTitle', language])
    return (
      <div className="loading-overley">
        <h1>{title}</h1>
        <p>{subtitle} ...</p>
        <br/>

        <div className="container">
          <div className="bar" id="loading-overley-b1" />
          <div className="bar" id="loading-overley-b2" />
          <div className="bar" id="loading-overley-b3" />
        </div>
      </div>
    )
  }
}

export default LoadingOverlay
