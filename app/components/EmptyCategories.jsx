const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')
const ShowHideEmptyCategoriesCreator = require('../actionCreators/ShowHideEmptyCategoriesCreator.js')

require('../styles/Common.scss')


class EmptyCategories extends React.Component {
  constructor() {
    super()
    this.state = {
      childVisible: false
    }
  }

  showImage() {
    const height = Constants.getIn(['showHide', 'showHideIconHeight'])
    const width = Constants.getIn(['showHide', 'showHideIconWidth'])
    if (this.props.showEmptyCategories) {
      return <image height = {height} width = {width} transform = {'translate(10,997)'} xlinkHref='images/button-down.svg'></image>
    }
    else {
      return <image height = {height} width = {width} transform = {'translate(10,997)'} xlinkHref='images/button-up.svg'></image>
    }
  }
  showText() {
    if (this.props.showEmptyCategories) {
      return <text x="35" y="1008" className="emptyCategories">
        <tspan>hide empty categories</tspan>
      </text>

    }
    else {
      return <text x="35" y="1008" className="emptyCategories">
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

/**
 <text x="35" y="1008" className="emptyCategories">
        <tspan onClick={this.props.onClick}>show empty categories</tspan>
        {this.props.showEmptyCategories && <Child />}
      </text>
      **/

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


