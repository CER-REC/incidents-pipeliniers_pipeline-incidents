const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const ResetVisualizationCreator = require('../actionCreators/ResetVisualizationCreator.js')
const DefaultCategoryComputations = require('../DefaultCategoryComputations.js')


require('./Header.scss')


class Header extends React.Component {

  homeButtonClick() {
    const categories = DefaultCategoryComputations.initialState(this.props.data)
    this.props.resetVisualization(categories)
  }

  homeButton() {
    return <image 
      xlinkHref = 'images/home.svg' 
      height = { Constants.getIn(['topBar', 'headerIconHeight']) }
      width = { Constants.getIn(['topBar', 'headerIconWidth']) }
      onClick = { this.homeButtonClick.bind(this) }
      className = 'homeButton'
    ></image>
  }

  headerButtons() {
    if (!this.props.screenshotMode) {
      const methodologyIconY = Constants.getIn(['topBar', 'methodologyIconY'])
      return <g>
        { this.homeButton() }

        //TODO: change link once we get PDF
        <a href='https://google.ca' target="_blank">
          <image 
            height = {Constants.getIn(['topBar', 'headerIconHeight'])}
            width = {Constants.getIn(['topBar', 'headerIconWidth'])}       
            y = {methodologyIconY}
            xlinkHref='images/methodology-icon-black.svg'
          ></image>
        </a>
      </g>
    }
    else {
      return null
    }
  }


  render() {
    const headerWidth = Constants.getIn(['topBar', 'width'])
    const headerHeight = Constants.getIn(['topBar', 'height'])
    const xHeading = Constants.getIn(['topBar', 'xHeading'])
    const yHeading = Constants.getIn(['topBar', 'yHeading'])
    const xSubpop = Constants.getIn(['topBar', 'xSubpop'])
    const ySubpop = Constants.getIn(['topBar', 'ySubpop'])
    const transformString = `translate(${Constants.get('leftOuterMargin')},${Constants.get('topOuterMargin')})`

    return <g transform = { transformString } className = 'header'>
      { this.headerButtons() }
      <svg width={headerWidth} height={headerHeight} xmlnsXlink='http://www.w3.org/1999/xlink'>
      
        <text x={xHeading} y={yHeading} className="heading"></text>
        <text x={xSubpop} y={ySubpop} className="subpop"></text>

      </svg>
    </g>
  
  }
}


const mapStateToProps = (state) => { 
  return {
    data: state.data,
    screenshotMode: state.screenshotMode,
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    resetVisualization: (categories) => {
      dispatch(ResetVisualizationCreator(categories))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Header)