const React = require('react')

const Tr = require('../../TranslationTable')
const Constants = require('../../Constants.js')
const WorkspaceComputations = require('../../WorkspaceComputations.js')

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
    return Constants.getIn(['columnTooltip', 'width'])
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
      width: this.getWidth(),
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
    return (
      <div onClick={this.preventClickCloseModal}>
        <div
          id='columnTooltip'
          className={`${this.getTooltipClass()} ${scrollClass}`}
          style={this.tooltipStyle()}
        >
          <div
            className="tooltipBody"
            style={{ maxHeight: WorkspaceComputations.topBarHeight() }}
          >
            <div className="tooltipMain">
              {this.title()}
              {this.description()}
            </div>
            {content}
          </div>
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

module.exports = SimpleTooltip
