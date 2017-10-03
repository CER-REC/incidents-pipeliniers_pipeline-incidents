const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const ShowIncidentListCreator = require('../actionCreators/ShowIncidentListCreator.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const Tr = require('../TranslationTable.js')

require('../styles/Common.scss')


class IncidentListShowHide extends React.Component {

  rotateImage() {
    const rotateHideImage = `rotate(${Constants.getIn(['pinColumn','chevron90Rotation'])} ${Constants.getIn(['pinColumn','hideIncidentListX'])} ${Constants.getIn(['pinColumn','hideIncidentListY'])})`
    const rotateSeeImage = `rotate(${Constants.getIn(['pinColumn','chevron270Rotation'])} ${Constants.getIn(['pinColumn','showIncidentListXY'])} ${Constants.getIn(['pinColumn','showIncidentListXY'])})`
    if(this.props.showIncidentList) {
      return rotateHideImage
    } else {
      return rotateSeeImage
    }
  }

  showImage() {
    const height = Constants.getIn(['pinColumn', 'labelIconSize'])
    const width = Constants.getIn(['pinColumn', 'labelIconSize'])

    const transformShowImage = `translate(0, ${-Constants.getIn(['showHideEmptyCategories','fontSize'])})`

    return <image 
      x = { Constants.getIn(['pinColumn', 'labelIconPadding']) }
      height = {height} 
      width = {width} 
      transform = {transformShowImage} 
      xlinkHref='images/button-down.svg'
      transform={ this.rotateImage() }>
    </image>
  }
  
  showText() {
    const xShowText = Constants.getIn(['showHideEmptyCategories', 'xShowText'])
    if(this.props.showIncidentList) {
      return <text x={xShowText} y={0} className="emptyCategories">
        <tspan>{ Tr.getIn(['hideIncidentList', this.props.language]) }</tspan>
      </text>

    }
    else {

      return <text x={xShowText} y={0} className="emptyCategories">
        <tspan>{ Tr.getIn(['showIncidentList', this.props.language]) }</tspan>
      </text>
    }
  }

  render() {
    // this with the drag arrows. 
    const yTransform = WorkspaceComputations.dragArrowY(this.props.viewport) - Constants.getIn(['pinColumn', 'labelPadding'])

    let transformShowHide = `translate(${Constants.get('showHideLeftMargin')}, ${yTransform})`
    return ( 
      <g transform = {transformShowHide} onClick={this.props.onClick}> 
        {this.showImage()}
        {this.showText()}
      </g>
    )
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
    showIncidentList: state.showIncidentList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(ShowIncidentListCreator())
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(IncidentListShowHide)


