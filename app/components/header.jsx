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
      <rect width={Constants.getIn(['socialBar', 'width'])}        
        height={Constants.getIn(['headerBar', 'height'])}
        x = {Constants.getIn(['workspace', 'maxWidth']) - 27}
        fill='#555556'
      />
      // TODO: add methodology PDF
      <a href='https://google.ca' target="_blank">
        <image 
          height = {Constants.getIn(['socialBar', 'iconSize'])}
          width = {Constants.getIn(['socialBar', 'iconSize'])}      
          y = {5}
          x ={Constants.getIn(['workspace', 'maxWidth']) - 24}
          xlinkHref='images/methodology-icon-white.svg'
        ></image>
      </a>

      // TODO: add reset all functionality
      <image 
        height = {Constants.getIn(['socialBar', 'iconSize'])}
        width = {Constants.getIn(['socialBar', 'iconSize'])}       
        y = {27}
        x ={Constants.getIn(['workspace', 'maxWidth']) - 24}
        xlinkHref='images/reset_button.svg'
      ></image>

      <text x={Constants.getIn(['workspace', 'maxWidth']) - 105} 
        y={21}
        className="headerButtons">METHODOLOGY</text>

      <text x={Constants.getIn(['workspace', 'maxWidth']) - 80} 
        y={40} className="headerButtons">RESET ALL</text>

      { this.homeButton() }

      <svg width={headerWidth} height={headerHeight} xmlnsXlink='http://www.w3.org/1999/xlink'>
      
        <text x={0} y={yHeading} className="heading">{"Incidents at NEB-regulated pipelines and facilities".toUpperCase()}</text>
        <text x={0} y={ySubpop} className="subpop">
          The information presented here is based on NEB data from 2008 to current for
          incidents reported under the Onshore Pipeline Regulations.
          New data is added on a quaterly basis.</text>
        <text x={0} y={ySubpop + 15} className="subpop">
         </text>
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