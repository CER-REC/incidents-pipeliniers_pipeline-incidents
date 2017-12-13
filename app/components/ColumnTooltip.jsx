
const React = require('react')
const ReactRedux = require('react-redux')

require('./ColumnTooltip.scss')

const Tr = require('../TranslationTable.js')
const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const ColumnTooltipListItem = require('./ColumnTooltipListItem.jsx')

class ColumnTooltip extends React.Component {
  title() {
    return <p
      className='PopupHeading'>
      {Tr.getIn(['tooltips', this.props.columnTooltip.get('columnName'), 'title', this.props.language])}
    </p>
  }

  description() {
    return <p
      className='PopupOverview'>
      {Tr.getIn(['tooltips', this.props.columnTooltip.get('columnName'), 'description', this.props.language])}
    </p>
  }

  separator() {
    const items = this.listItems()
    if (items.count() > 0) {
      return <hr className='separator'/>
    }
    else {
      return null
    }
  }

  listSymbol(item) {
    let sym = '+'
    if(item.get('expanded') === null) sym = ''
    return <span
      className='PopupPlusSign'>
      {sym}
    </span>
  }

  listItems() {
    return Tr.getIn(['tooltips', this.props.columnTooltip.get('columnName'), 'detail', this.props.language])

  }

  listText() {
    const items = this.listItems()
    return items.map(item => {
      return <ColumnTooltipListItem
        key={item.get('overview')} 
        item={item} 
        columnName={this.props.columnTooltip.get('columnName')}/>
    })
  }

  // Returns the offset (if needed) to ensure that the full tooltip
  // is visible within the viewport.
  alignmentOffset(leftEdge) {
    // Calculate the width of the left header, which tooltips need to be within.
    const regionWidth = this.props.viewport.get('x') * 0.8 // 80% viewport width

    // Check if the tooltip can be fully displayed within the viewport.
    if (leftEdge < 0) { return leftEdge }
    const rightEdge = leftEdge + Constants.getIn(['columnTooltip', 'width'])
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
      position: 'absolute',
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

  render() {
    return <div 
      id='columnTooltip'
      className='tooltip'
      style={this.tooltipStyle()}>
      {this.title()}
      {this.description()}
      {this.separator()}
      <div className='listContainer'>
        {this.listText()}
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    language: state.language,
    viewport: state.viewport,
    columnTooltip: state.columnTooltip,
    showEmptyCategories: state.showEmptyCategories,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(ColumnTooltip)
