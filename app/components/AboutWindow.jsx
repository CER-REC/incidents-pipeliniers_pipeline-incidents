
const React = require('react')
const ReactRedux = require('react-redux')

require('./AboutWindow.scss')

const Tr = require('../TranslationTable.js')
const PopupDismissedCreator = require('../actionCreators/PopupDismissedCreator.js')


class AboutWindow extends React.Component {

  closeButtonClick(e) {
    this.props.analytics.reportEvent('Header Links', 'About This Project Close Button')
    e.stopPropagation()
    e.preventDefault()
    this.props.onCloseButtonClicked()
  }

  closeButton() {
    return <img
      className='closeButton'
      src='images/about_close.svg'
      onClick={this.closeButtonClick.bind(this)}>
    </img>
  }

  heading() {
    return <p
      className='aboutHeading'>
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
          <a 
            href={Tr.getIn(['aboutText', 'safetyPerformancePortalLink', this.props.language])}
            target="_blank">
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
          <a href={Tr.getIn(['aboutText', 'emailLink', this.props.language])}>
            {Tr.getIn(['aboutText', 'emailText', this.props.language])}
          </a>
          {Tr.getIn(['aboutText', 'p4_2', this.props.language])}
        </span>
      </p>
    </div>    
  }

  render() {
    // Only render if the about window has been summoned.
    if(!this.props.about) return null

    return <div
      className='aboutWindow'>
      {this.heading()}
      {this.closeButton()}
      <hr/>
      {this.intro()}
      {this.contributersHeading()}
      {this.contributersContent()}
    </div>
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