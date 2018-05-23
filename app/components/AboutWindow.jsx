
const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')

require('./AboutWindow.scss')

const Tr = require('../TranslationTable.js')
const PopupDismissedCreator = require('../actionCreators/PopupDismissedCreator.js')


class AboutWindow extends React.Component {

  closeButtonClick(e) {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','headerLinks'])}`, 
      'selected', 
      '',  
      'about this project close button')
    e.stopPropagation()
    e.preventDefault()
    this.props.onCloseButtonClicked()

    document.querySelector('.aboutThisProject').focus()
  }


  closeButtonKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(event)
      event.stopPropagation(event)
      this.closeButtonClick(event)
    } 
  }

  closeButton() {
    return <img
      className='closeButton'
      src='images/about_close.svg'
      onClick={this.closeButtonClick.bind(this)}
      aria-label = 'close'
      role = 'button'
      tabIndex = '0'
      onKeyDown = { this.closeButtonKeyDown.bind(this) } >
    </img>
  }

  nebPerformancePortalAnalytics() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','headerLinks'])}`,
      'selected', 
      '',  
      'neb performance portal')
  }

  emailLinkAnalytics() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','headerLinks'])}`,
      'selected', 
      '',  
      'email link')
  }

  wikimediaLinkAnalytics() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','wikimediaCommons'])}`,
      'selected', 
      '',  
      'wikimedia commons')
  }

  ccByThreeLinkAnalytics() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','ccByThree'])}`,
      'selected', 
      '',  
      'cc by 3.0')
  }

  ccBySAThreeLinkAnalytics() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','ccBYSAThree'])}`,
      'selected', 
      '',   
      'cc by-sa 3.0')
  }

  heading() {
    return <p
      className='aboutHeading'
      tabIndex = '0'
      aria-labelledby =  {Tr.getIn(['aboutText', 'title', this.props.language])}>
      {Tr.getIn(['aboutText', 'title', this.props.language])}
    </p> 
  }

  contributersHeading() {
    return <p
      className='aboutHeading'>
      {Tr.getIn(['aboutText', 'contributers', this.props.language])}
    </p>    
  }

  contributersContent() {
    return <div 
      className='aboutContent'>
      <p
        className='aboutSubHeading'>
        {Tr.getIn(['aboutText', 'dataSourceTitle', this.props.language])}
      </p>
      <p>
        {Tr.getIn(['aboutText', 'dataSourceContent', this.props.language])}
      </p>
      <p
        className='aboutSubHeading'>
        {Tr.getIn(['aboutText', 'coordinationTitle', this.props.language])}
      </p>
      <p>
        {Tr.getIn(['aboutText', 'coordinationContent', this.props.language])}
      </p>
      <p
        className='aboutSubHeading'>
        {Tr.getIn(['aboutText', 'dataVisualizationTitle', this.props.language])}
      </p>
      <p>
        {Tr.getIn(['aboutText', 'dataVisualizationContent', 'leadDesign', this.props.language])}
        <br/>
        {Tr.getIn(['aboutText', 'dataVisualizationContent', 'design', this.props.language])}
        <br/>
        {Tr.getIn(['aboutText', 'dataVisualizationContent', 'leadTechnical', this.props.language])}
        <br/>
        {Tr.getIn(['aboutText', 'dataVisualizationContent', 'technical', this.props.language])}
      </p>
    </div>    
  }

  intro() {
    return <div
      className='aboutContent'>
      <p>
        <span>
          {Tr.getIn(['aboutText', 'p1', this.props.language])}
          <a onClick = {this.nebPerformancePortalAnalytics.bind(this)}
            href={Tr.getIn(['aboutText', 'safetyPerformancePortalLink', this.props.language])}
            target="_blank" >
            {Tr.getIn(['aboutText', 'safetyPerformancePortalText', this.props.language])}
          </a>
          {Tr.getIn(['aboutText', 'p1_2', this.props.language])}
        </span>
      </p>
      <p>
        <span>
          {Tr.getIn(['aboutText', 'p2', this.props.language])}
          .
        </span>
      </p>
      <p>
        <span>
          {Tr.getIn(['aboutText', 'p3', this.props.language])}
        </span>
      </p>
      <p>
        <span>
          {Tr.getIn(['aboutText', 'p4', this.props.language])}
          <a onClick = {this.emailLinkAnalytics.bind(this)}
            href={Tr.getIn(['aboutText', 'emailLink', this.props.language])}>
            {Tr.getIn(['aboutText', 'emailText', this.props.language])}
          </a>
          {Tr.getIn(['aboutText', 'p4_2', this.props.language])}
        </span>
      </p>
    </div>    
  }

  componentDidUpdate() {
    if(this.props.about) {
      document.querySelector('.aboutHeading').focus()
    }
  }

  onEscapeKeyDown(event) {
    if(event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      this.closeButtonClick(event)
    }
  }

  preventDismissal(e) {
    e.stopPropagation()
  }

  thirdPartyLicenseHeading() {
    return <p
      className='aboutHeading'>
      {Tr.getIn(['aboutText', 'thirdPartyLicensesTitle', this.props.language])}
    </p>    
  }

  thirdPartyLicensesMap() {
    return <div className='aboutContent'>
      <p className='aboutSubHeading'>
        {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'map', 'title', this.props.language])}
      </p>
      <p>
        <span>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'map', 'map_1', this.props.language])}
          <a onClick = {this.wikimediaLinkAnalytics.bind(this)}
            href={Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'map', 'map_2_link', this.props.language])}
            target="_blank">
            {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'map', 'map_2_text', this.props.language])}
          </a>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'licenceUnder', this.props.language])}
          
          <a onClick = {this.ccByThreeLinkAnalytics.bind(this)}
            href={Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'ccByThreeLink', this.props.language])}
            target="_blank">
            {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'ccByThree', this.props.language])}
          </a>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'map', 'map_3', this.props.language])}
        </span>
      </p>
    </div>
  }

  thirdPartyLicensestellMeAStoryIcon() {
    return <div className='aboutContent'>
      <p className='aboutSubHeading'>
        {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'tellMeAStoryIcon', 'title', this.props.language])}
      </p>
      <p>
        <span>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'tellMeAStoryIcon', 'content', this.props.language])}
          <a onClick = {this.ccBySAThreeLinkAnalytics.bind(this)}
            href={Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'tellMeAStoryIcon', 'link', this.props.language])}
            target="_blank">
            {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'tellMeAStoryIcon', 'link_text', this.props.language])}
          </a>
        </span>
      </p>
    </div>
  }

  thirdPartyLicensesMethodIcon() {
    return <div className='aboutContent'>
      <p className='aboutSubHeading'>
        {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'methodologyIcon', 'title', this.props.language])}
      </p>
      <p>
        <span>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'methodologyIcon', 'content', this.props.language])}
          <a 
            href={Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'methodologyIcon', 'text1Link', this.props.language])}
            target="_blank">
            {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'methodologyIcon', 'text1', this.props.language])}
          </a>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'from', this.props.language])}
          <a 
            href={Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'theNounProjectLink', this.props.language])}
            target="_blank">
            {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'theNounProject', this.props.language])}
          </a>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'licenceUnder', this.props.language])}
          
          <a onClick = {this.ccByThreeLinkAnalytics.bind(this)}
            href={Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'ccByThreeLink', this.props.language])}
            target="_blank">
            {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'ccByThree', this.props.language])}
          </a>
        </span>
      </p>
    </div>
  }

  thirdPartyLicensesResetIcon() {
    return <div className='aboutContent'>
      <p className='aboutSubHeading'>
        {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'resetIcon', 'title', this.props.language])}
      </p>
      <p>
        <span>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'resetIcon', 'content', this.props.language])}
          <a 
            href={Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'resetIcon', 'text1Link', this.props.language])}
            target="_blank">
            {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'resetIcon', 'text1', this.props.language])}
          </a>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'from', this.props.language])}
          <a 
            href={Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'theNounProjectLink', this.props.language])}
            target="_blank">
            {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'theNounProject', this.props.language])}
          </a>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'licenceUnder', this.props.language])}
          
          <a onClick = {this.ccByThreeLinkAnalytics.bind(this)}
            href={Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'ccByThreeLink', this.props.language])}
            target="_blank">
            {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'ccByThree', this.props.language])}
          </a>
        </span>
      </p>
    </div>
  }

  thirdPartyLicensesFacebookIcon() {
    return <div className='aboutContent'>
      <p className='aboutSubHeading'>
        {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'facebookIcon', 'title', this.props.language])}
      </p>
      <p>
        <span>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'facebookIcon', 'text1', this.props.language])}
          <a 
            href={Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'facebookIcon', 'text2Link', this.props.language])}
            target="_blank">
            {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'facebookIcon', 'text2', this.props.language])}
          </a>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'from', this.props.language])}
          <a 
            href={Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'theNounProjectLink', this.props.language])}
            target="_blank">
            {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'theNounProject', this.props.language])}
          </a>
          {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'licenceUnder', this.props.language])}
          
          <a onClick = {this.ccByThreeLinkAnalytics.bind(this)}
            href={Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'ccByThreeLink', this.props.language])}
            target="_blank">
            {Tr.getIn(['aboutText', 'thirdPartyLicensesContent', 'common', 'ccByThree', this.props.language])}
          </a>
        </span>
      </p>
    </div>
  }

  thirdPartyLicensesContent() {
    return <div>
      {this.thirdPartyLicensesMap()}
      {this.thirdPartyLicensestellMeAStoryIcon()}
      {this.thirdPartyLicensesMethodIcon()}
      {this.thirdPartyLicensesResetIcon()}
      {this.thirdPartyLicensesFacebookIcon()}
    </div>     
  }

  render() {
    // Only render if the about window has been summoned.
    if(!this.props.about) return null
 
    return <g> 
      <div 
        onClick = { this.preventDismissal.bind(this) }
        className='aboutWindow'
        onKeyDown = {this.onEscapeKeyDown.bind(this) }
      >
        {this.heading()}
        {this.closeButton()}
        <hr/>
        {this.intro()}
        <div>
          {this.contributersHeading()}
          {this.contributersContent()}
          {this.thirdPartyLicenseHeading()}
          {this.thirdPartyLicensesContent()}
        </div>
      </div>
    </g>

  }
 
}

const mapStateToProps = state => {
  return {
    language: state.language,
    about: state.about,
    analytics: state.analytics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseButtonClicked: () => {
      dispatch(PopupDismissedCreator())
    },
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AboutWindow)