const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')
const ShowHideEmptyCategoriesCreator = require('../actionCreators/ShowHideEmptyCategoriesCreator.js')

require('../styles/Common.scss')


class EmptyCategories extends React.Component {

  showImage() {
    const height = Constants.getIn(['showHideEmptyCategories', 'showHideIconHeight'])
    const width = Constants.getIn(['showHideEmptyCategories', 'showHideIconWidth'])

    let transformShowImage = `translate(${Constants.getIn(['showHideEmptyCategories','xShowImage'])},${Constants.getIn(['showHideEmptyCategories','yShowImage'])})`

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
    const yShowText = Constants.getIn(['showHideEmptyCategories', 'yShowText'])
    if (this.props.showEmptyCategories) {
      return <text x={xShowText} y={yShowText} className="emptyCategories">
        <tspan>hide empty categories</tspan>
      </text>

    }
    else {
      return <text x={xShowText} y={yShowText} className="emptyCategories">
        <tspan>show empty categories</tspan>
      </text>
    }
  }
  render() {
    let transformShowHide = `translate(${Constants.get('showHideLeftMargin')},${Constants.get('showHideTopMargin')})`
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
    showEmptyCategories: state.showEmptyCategories
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


