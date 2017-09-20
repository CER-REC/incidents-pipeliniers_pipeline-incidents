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
    // return <image 
    //   xlinkHref = 'images/home.svg' 
    //   height = { Constants.getIn(['topBar', 'headerIconHeight']) }
    //   width = { Constants.getIn(['topBar', 'headerIconWidth']) }
    //   onClick = { this.homeButtonClick.bind(this) }
    //   className = 'homeButton'
    // ></image>
  }

  render() {
    const headerWidth = Constants.getIn(['topBar', 'width'])
    const headerHeight = Constants.getIn(['topBar', 'height'])
    const xHeading = Constants.getIn(['topBar', 'xHeading'])
    const yHeading = Constants.getIn(['topBar', 'yHeading'])
    const xSubpop = Constants.getIn(['topBar', 'xSubpop'])
    const ySubpop = Constants.getIn(['topBar', 'ySubpop'])
    const methodologyIconY = Constants.getIn(['topBar', 'methodologyIconY'])
    const transformString = `translate(${Constants.get('leftOuterMargin')},${Constants.get('topOuterMargin')})`

    return <g transform = { transformString } className = 'header'>
      <rect width={ 23 }
        height={ 50 }
        x = {Constants.getIn(['workspace', 'maxWidth']) - 23}
        fill='#555556'
      />
      // TODO: add methodology PDF
      <a href='https://google.ca' target="_blank">
        <image 
          height = {Constants.getIn(['topBar', 'headerIconHeight'])}
          width = {Constants.getIn(['topBar', 'headerIconWidth'])}       
          y = {5}
          x ={Constants.getIn(['workspace', 'maxWidth']) - 23}
          xlinkHref='images/methodology-icon-white.svg'
        ></image>
      </a>

      <a href='https://google.ca' target="_blank">
        <image 
          height = {Constants.getIn(['topBar', 'headerIconHeight'])}
          width = {Constants.getIn(['topBar', 'headerIconWidth'])}       
          y = {27}
          x ={Constants.getIn(['workspace', 'maxWidth']) - 23}
          xlinkHref='images/reset_arrow.svg'
        ></image>
      </a>
      <text x={Constants.getIn(['workspace', 'maxWidth']) - 113} 
        y={21}
        className="barsHeading">METHODOLOGY</text>
      <text x={Constants.getIn(['workspace', 'maxWidth']) - 83} 
        y={40} className="barsHeading">RESET ALL</text>
      { this.homeButton() }

      <svg width={headerWidth} height={headerHeight} xmlnsXlink='http://www.w3.org/1999/xlink'>
      
        <text x={xHeading} y={yHeading} className="heading">Heading</text>
        <text x={xSubpop} y={ySubpop} className="subpop">subheading</text>

      </svg>
    </g>
  
  }
}

const mapStateToProps = (state) => { 
  return {
    data: state.data
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