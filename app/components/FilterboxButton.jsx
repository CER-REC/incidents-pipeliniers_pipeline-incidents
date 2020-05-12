import React from 'react'
import * as ReactRedux from 'react-redux'

import Constants from '../Constants.js'
import FilterboxComputations from '../FilterboxComputations.js'

class FilterboxButton extends React.Component {

  render() {
    const transform = `translate(${this.props.x}, ${this.props.y})`
    return <g
      className = 'filterBoxButton'
      onClick = { this.props.clickCallback }
      onKeyDown = {this.props.keyDownCallback}
      transform = { transform }
      tabIndex ='0'
    >
      <rect
        className = 'filterBoxRect'
        x = '0'
        y = '0'
        width = { FilterboxComputations.boxWidth(this.props.language) }
        height = { Constants.getIn(['filterbox', 'filterButtonHeight']) }
      />
      <image 
        xlinkHref = { this.props.imageUrl }
        x = { Constants.getIn(['filterbox', 'iconHorizontalOffset']) }
        y = { Constants.getIn(['filterbox', 'filterIconVerticalOffset']) }
        width = { Constants.getIn(['filterbox', 'iconSize']) }
        height = { Constants.getIn(['filterbox', 'iconSize']) }
      />
      <text
        className = 'filterBox'
        x = { Constants.getIn(['filterbox', 'iconSize'])
          + Constants.getIn(['filterbox', 'iconTextOffset'])
          + Constants.getIn(['filterbox', 'iconHorizontalOffset']) }
        y = { Constants.getIn(['filterbox', 'textVerticalOffset']) }
        width = { Constants.getIn(['filterbox', 'textWidth']) }
        height = { Constants.getIn(['filterbox', 'textHeight']) }
      >
        { this.props.text }
      </text>
    </g>
    
  }


}

const mapStateToProps = state => {
  return {
    language: state.language,
  }
}

export default ReactRedux.connect(mapStateToProps)(FilterboxButton)