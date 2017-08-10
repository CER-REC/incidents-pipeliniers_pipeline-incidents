const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const ShowHideEmptyCategoriesCreator = require('../actionCreators/ShowHideEmptyCategoriesCreator.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')

require('../styles/Common.scss')


class EmptyCategories extends React.Component {

  showImage() {
    const height = Constants.getIn(['showHideEmptyCategories', 'showHideIconHeight'])
    const width = Constants.getIn(['showHideEmptyCategories', 'showHideIconWidth'])

    let transformShowImage = `translate(0, ${-Constants.getIn(['showHideEmptyCategories','fontSize'])})`

    if (this.props.showEmptyCategories) {
      return <image 
        height = {height} 
        width = {width} 
        transform = {transformShowImage} 
        xlinkHref='images/button-down.svg'></image>
    }
    else {
      return <image 
        height = {height} 
        width = {width} 
        transform = {transformShowImage} 
        xlinkHref='images/button-up.svg'></image>
    }
  }
  showText() {
    const xShowText = Constants.getIn(['showHideEmptyCategories', 'xShowText'])
    if (this.props.showEmptyCategories) {
      return <text x={xShowText} y={0} className="emptyCategories">
        <tspan>hide empty categories</tspan>
      </text>

    }
    else {
      return <text x={xShowText} y={0} className="emptyCategories">
        <tspan>show empty categories</tspan>
      </text>
    }
  }


  render() {

    const yTransform = WorkspaceComputations.baselineHeight(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data, 
      this.props.columns,
      this.props.categories
    ) - Constants.getIn(['showHideEmptyCategories', 'fontSize'])

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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(ShowHideEmptyCategoriesCreator())
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(EmptyCategories)


