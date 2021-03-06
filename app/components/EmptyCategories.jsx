import React from 'react'
import * as ReactRedux from 'react-redux'

import Constants from '../Constants.js'
import ShowHideEmptyCategoriesCreator from '../actionCreators/ShowHideEmptyCategoriesCreator.js'
import WorkspaceComputations from '../WorkspaceComputations.js'
import Tr from '../TranslationTable.js'

import '../styles/Common.scss'
import './EmptyCategories.scss'


class EmptyCategories extends React.Component {

  checkbox() {
    const height = Constants.getIn(['showHideEmptyCategories', 'showHideIconHeight'])
    const width = Constants.getIn(['showHideEmptyCategories', 'showHideIconWidth'])

    const transformShowImage = `translate(0, ${-Constants.getIn(['showHideEmptyCategories','fontSize'])})`

    if (this.props.showEmptyCategories) {
      return <rect className="emptyCategories"
        y = { Constants.getIn(['showHideEmptyCategories','checkboxPadding']) }
        x = { Constants.getIn(['showHideEmptyCategories','checkboxPadding']) }
        height = {height} 
        width = {width} 
        transform = {transformShowImage} 
        fill = '#666'></rect>
    } else {
      return <rect className="emptyCategories"
        y = { Constants.getIn(['showHideEmptyCategories','checkboxPadding']) }
        x = { Constants.getIn(['showHideEmptyCategories','checkboxPadding']) }
        height = {height - Constants.getIn(['showHideEmptyCategories','checkboxStrokePadding'])} 
        width = {width - Constants.getIn(['showHideEmptyCategories','checkboxStrokePadding'])} 
        transform = {transformShowImage} 
        stroke = '#666' 
        strokeWidth = { Constants.getIn(['showHideEmptyCategories','checkboxWidth']) }
        fill='transparent'></rect>
    }
  }
  showText() {
    const xShowText = Constants.getIn(['showHideEmptyCategories', 'xShowText'])
    if (this.props.showEmptyCategories) {
      return <text x={xShowText} y={0} className="emptyCategories">
        <tspan>{ Tr.getIn(['hideEmptyCategories', this.props.language]) }</tspan>
      </text>

    }
    else {

      return <text x={xShowText} y={0} className="emptyCategories">
        <tspan>{ Tr.getIn(['seeEmptyCategories', this.props.language]) }</tspan>
      </text>
    }
  }

  emptyCategoriesKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.props.onClick()
    }
  }

  dividerLine() {
    const transformDividerLine = `translate(${0},${Constants.getIn(['showHideEmptyCategories','dividerLinePadding'])})`
    return <g className="dividerLine" transform={transformDividerLine} >
      <line  x1="0" y1="0" x2={Constants.getIn(['showHideEmptyCategories','dividerLineLength'])} y2="0"/>
    </g>
  }

  emptyCategoriesAnalytics() {
    const actionString = this.props.showEmptyCategories ? 'hide empty categories' : 'show empty categories'
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','emptyCategories'])}`,
      'selected',
      actionString)
    this.props.onClick(
      this.props.dividerLine,
      this.props.checkbox,
      this.props.showText)
  }

  render() {

    // TODO: it is a mystery to me why this fudge factor is needed to align
    // this with the drag arrows. 
    const yTransform = WorkspaceComputations.dragArrowY(this.props.viewport) + 
      Constants.get('emptyCategoryLabelFudgeFactor')

    // TODO: adapt empty categories to use horizontalComputations

    let transformShowHide = `translate(${Constants.get('showHideLeftMargin')}, ${yTransform})`

    return (
      <g transform = {transformShowHide} onClick={this.emptyCategoriesAnalytics.bind(this)}> 
        <g 
          tabIndex = '0'
          role = 'button'
          onKeyDown = { this.emptyCategoriesKeyDown.bind(this) }
          aria-label = {Tr.getIn(['seeEmptyCategories'], this.props.language)}
        > 
          {this.showText()}
        </g> 
        <g >
          {this.dividerLine()}
          {this.checkbox()}
        </g>
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
    analytics: state.analytics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(ShowHideEmptyCategoriesCreator())
    }
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(EmptyCategories)


