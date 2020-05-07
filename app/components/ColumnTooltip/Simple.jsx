import React from 'react'

import Tr from '../../TranslationTable'
import Constants from '../../Constants.js'
import WorkspaceComputations from '../../WorkspaceComputations.js'

class SimpleTooltip extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasScrollbar: false }
  }

  getColumnTranslation() {
    return Tr.getIn(['tooltips', this.props.columnTooltip.get('columnName')])
  }

  title() {
    return (
      <span className="tooltipTitle">
        {this.getColumnTranslation()
          .getIn(['title', this.props.language])}
      </span>
    )
  }

  description() {
    return (
      <p className="tooltipDescription">
        {this.getColumnTranslation()
          .getIn(['description', this.props.language])}
      </p>
    )
  }

  getWidth() {
    // If this is a simple tooltip, and isn't extended, Double the width
    const baseWidth = Constants.getIn(['columnTooltip', 'width'])
    return (this.constructor === SimpleTooltip) ? baseWidth * 2 : baseWidth
  }

  // Returns the offset (if needed) to ensure that the full tooltip
  // is visible within the viewport.
  alignmentOffset(leftEdge) {
    // Calculate the width of the left header, which tooltips need to be within.
    const regionWidth = this.props.viewport.get('x') * 0.8 // 80% viewport width

    // Check if the tooltip can be fully displayed within the viewport.
    if (leftEdge < 0) { return leftEdge }
    const rightEdge = leftEdge + this.getWidth()
    if (rightEdge > regionWidth) { return rightEdge - regionWidth }

    // No offset is needed otherwise.
    return 0
  }

  tooltipStyle() {
    const position = WorkspaceComputations.columnTooltipPosition(
      this.props.columnTooltip, 
      this.props.language, 
      this.props.showEmptyCategories, 
      this.props.viewport, 
      this.props.data, 
      this.props.columns, 
      this.props.categories)

    return {
      bottom: position.get('y'),
      left: position.get('x') - this.alignmentOffset(position.get('x')),
      maxWidth: this.getWidth(),
    }
  }

  tooltipIndicatorStyle() {
    const position = WorkspaceComputations.columnTooltipIndicatorPosition(
      this.props.columnTooltip,
      this.props.language,
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)

    return {
      bottom: position.get('y'),
      left: position.get('x'),
    }
  }

  handleDOMTweaks() {
		const tooltipBody = document.querySelector('#columnTooltip .tooltipBody')
    if (!tooltipBody) { return }
    // Scroll to the top of the tooltip to make sure
    // that the tooltip title is fully visible.
    tooltipBody.scrollTop = 0
    const hasScrollbar = (tooltipBody.scrollHeight > tooltipBody.clientHeight)
    if (hasScrollbar !== this.state.hasScrollbar) {
      this.setState({ hasScrollbar })
    }
  }

  componentDidMount() {
    this.handleDOMTweaks()
  }

  componentDidUpdate() {
    this.handleDOMTweaks()
  }

  getTooltipClass() {
    return 'SimpleTooltip'
  }

  preventClickCloseModal(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  closeTooltip(e) {

    e.stopPropagation()
    e.preventDefault()
    this.props.ColumnTooltipDismiss()
  }

  getTooltipLayout(content = null) {
    const scrollClass = this.state.hasScrollbar ? 'scrolling' : ''
    const heightStyle = {
      maxHeight: WorkspaceComputations.topBarHeight(),
    }
    if (this.getTooltipClass() !== 'SimpleTooltip') {
      heightStyle.minHeight = WorkspaceComputations.topBarHeight()
    }
    return (
      <div onClick={this.preventClickCloseModal}>
        <div
          id='columnTooltip'
          className={`${this.getTooltipClass()} ${scrollClass}`}
          style={this.tooltipStyle()}
        >
          <div className="tooltipMain" style={heightStyle}>
            {this.title()}
            {this.description()}
          </div>
          {!content ? null : (
            <div className="tooltipBody" style={heightStyle}>
              {content}
            </div>
          )}
          <a
            aria-label="Close"
            onClick={this.closeTooltip.bind(this)}
            className="closeTooltip"
          >
            <img
              src="images/close-2.svg"
              alt="Close Tooltip"
            />
          </a>
        </div>
        <div
          id="columnTooltipIndicator"
          style={this.tooltipIndicatorStyle()}
        />
      </div>
    )
  }

  render() {
    return this.getTooltipLayout()
  }
}



export default SimpleTooltip
