const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const ShowHideEmptyCategoriesCreator = require('../actionCreators/ShowHideEmptyCategoriesCreator.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const Tr = require('../TranslationTable.js')

require('../styles/Common.scss')


class IncidentListShowHide extends React.Component {

  showImage() {
    const height = Constants.getIn(['pinColumn', 'labelIconSize'])
    const width = Constants.getIn(['pinColumn', 'labelIconSize'])

    const transformShowImage = `translate(0, ${-Constants.getIn(['showHideEmptyCategories','fontSize'])})`

    if (this.props.showEmptyCategories) {
      return <image 
        x = { Constants.getIn(['pinColumn', 'labelIconPadding']) }
        height = {height} 
        width = {width} 
        transform = {transformShowImage} 
        xlinkHref='images/button-down.svg'
        transform='rotate(90 10,5)'></image>
    } else {
      return <image 
        x = { Constants.getIn(['pinColumn', 'labelIconPadding']) }
        height = {height} 
        width = {width} 
        transform = {transformShowImage} 
        xlinkHref='images/button-up.svg'
        transform='rotate(90 10,5)'></image>
    }
  }
  showText() {
    const xShowText = Constants.getIn(['showHideEmptyCategories', 'xShowText'])
    if (this.props.showEmptyCategories) {
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
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
    language: state.language,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(ShowHideEmptyCategoriesCreator())
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(IncidentListShowHide)


