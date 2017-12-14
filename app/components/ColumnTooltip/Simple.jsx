const React = require('react')

const Tr = require('../../TranslationTable')
const Constants = require('../../Constants.js')
const WorkspaceComputations = require('../../WorkspaceComputations.js')

class SimpleTooltip extends React.Component {
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
      maxHeight: WorkspaceComputations.topBarHeight(),
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

  componentDidMount() {
    // Scroll to the top of the tooltip to make sure
    // that the tooltip title is fully visible.
    document.getElementById('columnTooltip').scrollTop = 0
  }

  componentDidUpdate() {
    // Scroll to the top of the tooltip to make sure
    // that the tooltip title is fully visible.
    document.getElementById('columnTooltip').scrollTop = 0
  }

  getTooltipClass() {
    return 'SimpleTooltip'
  }

  preventClickCloseModal(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  getTooltipLayout(content = null) {
    return (
      <div onClick={this.preventClickCloseModal}>
        <div
          id='columnTooltip'
          className={`tooltip ${this.getTooltipClass()}`}
          style={this.tooltipStyle()}
        >
          <div className="tooltipMain">
            {this.title()}
            {this.description()}
          </div>
          {content}
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
