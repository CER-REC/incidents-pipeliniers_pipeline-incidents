const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const ResetVisualizationCreator = require('../actionCreators/ResetVisualizationCreator.js')
const DisclaimerSummonedCreator = require('../actionCreators/DisclaimerSummonedCreator.js')
const AboutSummonedCreator = require('../actionCreators/AboutSummonedCreator.js')
const DefaultCategoryComputations = require('../DefaultCategoryComputations.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const RouteComputations = require('../RouteComputations.js')

require('./Header.scss')


class Header extends React.Component {
  tellMeAStoryClick() {
    this.tellMeAStoryAction()
  }

  tellMeAStoryKeyDown (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.tellMeAStoryAction()
    }
  }

  tellMeAStoryAction() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','menuButtons'])}`, 
      'selected', 
      'TODO',  
      'tell me a story')
    const scrollOptions = {
      behavior: 'smooth', 
      block: 'start', 
      inline: 'nearest'
    }
    document.getElementById(Constants.get('storyBarID'))
      .scrollIntoView(scrollOptions)
    document.querySelector('.story').focus() 
  }

  aboutThisProjectClick(e) {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','menuButtons'])}`,
      'selected', 
      'TODO', 
      'about this project')
    e.stopPropagation(e)
    e.preventDefault(e)    
    
    this.props.summonAboutWindow()
  }

  aboutThisProjectKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(event)
      event.stopPropagation(event)
      this.aboutThisProjectClick(event)
    }
  }

  methodologyClick() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','menuButtons'])}`,
      'selected',
      'TODO',
      'methodology')
    const appRoot = RouteComputations.appRoot(document.location, this.props.language)
    window.open(`${appRoot}${Tr.getIn(['methodologyLinks', this.props.language])}`)
  }

  methodologyKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.methodologyClick()
    }
  }

  resetAllClick() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','menuButtons'])}`,
      'selected',
      'TODO', 
      'reset all')
    const categories = DefaultCategoryComputations.initialState(
      this.props.data,
      this.props.schema, 
      this.props.language
    )
    this.props.resetVisualization(categories)
  }

  resetAllKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.resetAllClick()
    }
  }

  disclaimerClick(event) {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','headerLinks'])}`,
      'selected', 
      'TODO', 
      'data disclaimer')
    event.preventDefault()
    this.props.summonDisclaimer()
  }

  learnMoreAnalytics() {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','headerLinks'])}`,
      'selected', 
      'TODO', 
      'learn more')
  }

  leftHeading() {
    return <div className = 'leftHeader'>
      <h1
        className = 'heading'
        id = 'incidentVisualizationHeading'
      >{ Tr.getIn(['mainHeading', this.props.language]).toUpperCase() }</h1>
      <p
        className = 'subpop'>
        { Tr.getIn(['mainSubheading', this.props.language]) }
        {this.props.lastUpdate}.&nbsp;
        <a href="#" onClick = {this.disclaimerClick.bind(this)}
          id={Constants.get('dataDisclaimerWindowID')} className = 'dataDisclaimerText'>{ Tr.getIn(['dataDisclaimer', this.props.language]) }</a>
      </p>
      <p className = 'subpop'>
        <a onClick = {this.learnMoreAnalytics.bind(this)}
          href={Tr.getIn(['learnMoreLinks', this.props.language])} 
          target="_blank">{Tr.getIn(['learnMore', this.props.language])}</a>
        {Tr.getIn(['dataCollectionSubheading', this.props.language])}
      </p>
    </div>
  }


  rightButtons() {
    if (this.props.screenshotMode) {
      return null
    }

    const socialBarMeasurements = WorkspaceComputations.socialBarMeasurements(this.props.viewport)

    let transformContainer = `translate(${socialBarMeasurements.get('x') - Constants.getIn(['socialBar', 'iconSideMargin'])}, 0)`

    let transformButtons = `translate(${Constants.getIn(['socialBar', 'iconSideMargin']) * 2}, ${Constants.getIn(['socialBar', 'iconSideMargin'])})`
    
    let transformText = `translate(0, ${Constants.getIn(['socialBar', 'iconSideMargin'])})`


    return <svg
      className = 'rightButtons'
      width = { this.props.viewport.get('x')}
      height = { Constants.getIn(['topBar', 'height'])}
    >
      <g transform = { transformContainer }>

        <rect
          width = { Constants.getIn(['socialBar', 'width']) }
          height = { Constants.getIn(['headerBar', 'height']) }
          x = { Constants.getIn(['socialBar', 'iconSideMargin']) }
          className = 'headerBarBackground'
        />

        <g transform = { transformText }>
          <text
            className = 'headerButtonLabel'
            x = { Constants.getIn(['headerBar', 'headerLabelLeftOffset']) }
            y = { Constants.getIn(['headerBar', 'tellMeAStoryHeight']) + Constants.getIn(['headerBar', 'headerLabelFontSize'])}
            fontSize = { Constants.getIn(['headerBar', 'headerLabelFontSize'])}
            onClick = { this.tellMeAStoryClick.bind(this) }
            tabIndex = '0'
            aria-label = { Tr.getIn(['tellMeAStory', this.props.language]) }
            role = 'button'
            onKeyDown = { this.tellMeAStoryKeyDown.bind(this) } 
          >{ Tr.getIn(['tellMeAStory', this.props.language]).toUpperCase() }</text>
          <text
            className = 'aboutThisProject'
            id = {Constants.get('aboutThisProject')}
            x = { Constants.getIn(['headerBar', 'headerLabelLeftOffset']) }
            y = { Constants.getIn(['headerBar', 'aboutThisProjectHeight']) + Constants.getIn(['headerBar', 'headerLabelFontSize']) }
            fontSize = { Constants.getIn(['headerBar', 'headerLabelFontSize'])}
            onClick = { this.aboutThisProjectClick.bind(this) }
            tabIndex = '0'
            aria-label = { Tr.getIn(['aboutThisProject', this.props.language]) }
            role = 'button'
            onKeyDown = { this.aboutThisProjectKeyDown.bind(this) } 
          >{ Tr.getIn(['aboutThisProject', this.props.language]).toUpperCase() }</text>
          <text
            className = 'headerButtonLabel'
            x = { Constants.getIn(['headerBar', 'headerLabelLeftOffset']) }
            y = { Constants.getIn(['headerBar', 'methodologyHeight']) + Constants.getIn(['headerBar', 'headerLabelFontSize']) }
            fontSize = { Constants.getIn(['headerBar', 'headerLabelFontSize'])}
            onClick = { this.methodologyClick.bind(this) }
            tabIndex = '0'
            aria-label = { Tr.getIn(['methodology', this.props.language]) }
            role = 'button'
            onKeyDown = { this.methodologyKeyDown.bind(this) }
          >{ Tr.getIn(['methodology', this.props.language]).toUpperCase() }</text>
          <text
            className = 'headerButtonLabel'
            x = { Constants.getIn(['headerBar', 'headerLabelLeftOffset']) }
            y = { Constants.getIn(['headerBar', 'resetAllHeight']) + Constants.getIn(['headerBar', 'headerLabelFontSize']) }
            fontSize = { Constants.getIn(['headerBar', 'headerLabelFontSize'])}
            onClick = { this.resetAllClick.bind(this) }
            tabIndex = '0'
            aria-label = { Tr.getIn(['resetAll', this.props.language]) }
            role = 'button'
            onKeyDown = { this.resetAllKeyDown.bind(this) }
          >{ Tr.getIn(['resetAll', this.props.language]).toUpperCase() }</text>

        </g>

        <g transform = { transformButtons }>
    
          <image 
            className = 'headerButton'
            height = {Constants.getIn(['socialBar', 'iconSize']) }
            width = {Constants.getIn(['socialBar', 'iconSize']) }
            y = { Constants.getIn(['headerBar', 'tellMeAStoryHeight'])}
            onClick = { this.tellMeAStoryClick.bind(this) }
            xlinkHref = 'images/tell_me_a_story.svg'
          ></image>

          <image 
            className = 'headerButton'
            height = {Constants.getIn(['socialBar', 'iconSize']) }
            width = {Constants.getIn(['socialBar', 'iconSize']) }
            y = { Constants.getIn(['headerBar', 'aboutThisProjectHeight'])}
            onClick = { this.aboutThisProjectClick.bind(this) }
            xlinkHref = 'images/about_this_project.svg'
          ></image>

          <image 
            className = 'headerButton'
            height = {Constants.getIn(['socialBar', 'iconSize']) }
            width = {Constants.getIn(['socialBar', 'iconSize']) }
            y = { Constants.getIn(['headerBar', 'methodologyHeight'])}
            onClick = { this.methodologyClick.bind(this) }
            xlinkHref = 'images/methodology_new.svg'
          ></image>

          <image 
            className = 'headerButton'
            height = {Constants.getIn(['socialBar', 'iconSize'])}
            width = {Constants.getIn(['socialBar', 'iconSize'])}
            y = { Constants.getIn(['headerBar', 'resetAllHeight'])}
            onClick = { this.resetAllClick.bind(this) }
            xlinkHref = 'images/reset_button-white.svg'
          ></image>

        </g>

      </g>
    </svg>
  }

  render() {
    return <div className = 'headingContainer'>
      { this.rightButtons() }
      { this.leftHeading() }
    </div>
  }
}

const mapStateToProps = (state) => { 
  return {
    data: state.data,
    screenshotMode: state.screenshotMode,
    language: state.language,
    viewport: state.viewport,
    schema: state.schema,
    analytics: state.analytics,
    lastUpdate: state.lastUpdate,
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    resetVisualization: (categories) => {
      dispatch(ResetVisualizationCreator(categories))
    },
    summonDisclaimer: () => {
      dispatch(DisclaimerSummonedCreator())
    },
    summonAboutWindow: () => {
      dispatch(AboutSummonedCreator())
    },
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Header)
