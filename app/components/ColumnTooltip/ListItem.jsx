const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../../Constants.js')
const ColumnTooltipDetailExpandCreator = require('../../actionCreators/ColumnTooltipDetailExpandCreator.js')
const ColumnTooltipDetailCollapseCreator = require('../../actionCreators/ColumnTooltipDetailCollapseCreator.js')

class TooltipListItem extends React.Component {
  detailClick(e) {
    e.stopPropagation()
    e.preventDefault()

    if (!this.props.item.get('expanded')) { return null }
    // TODO: Currently this reports the overview element in whichever language
    // it happens to be, but we would like to standardize on reporting analytics
    // in English. Refactors to the props passed by ColumnTooltip would be
    // needed.

    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','questionMark'])}`,
      'Selected',
      'TODO',
      `${this.props.item.get('overview')} detail overview`,
      `${Constants.getIn(['analyticsCategory','pipelineIncidents'])}`)

    if(this.props.columnTooltipClick.get('columnName') === this.props.columnName &&
       this.props.columnTooltipClick.get('itemOverview') === this.props.item.get('overview'))
      this.props.onDetailCollapse()
    else
      this.props.onDetailExpand(this.props.columnName, this.props.item.get('overview'))
  }

  listColorBox() {
    const colour = this.props.categoryColours.get(this.props.categoryName);
    if (!colour) { return null; }
    return (
      <span
        className="colorBox"
        style={{ background: colour }}
      />
    )
  }

  listSymbol() {
    if (!this.props.item.get('expanded')) { return null }

    let sym = '+'
    if (this.props.columnTooltipClick.get('columnName') === this.props.columnName &&
            this.props.columnTooltipClick.get('itemOverview') === this.props.item.get('overview')) {
      sym = '-'     
    }
    return <span className='expandCollapse' >{sym}</span>
  }

  overviewText() {
    const { columnTooltipClick, columnName, item } = this.props;
    let textClassName = 'listItemTitle'
    if (columnTooltipClick.get('columnName') === columnName &&
        columnTooltipClick.get('itemOverview') === item.get('overview')) {
      textClassName += ' active'
    }
    return <span 
      className={textClassName}
    >
      {item.get('overview')}
    </span>
  }

  detailText() {
    const { columnTooltipClick, columnName, item } = this.props;
    if (!item.get('expanded')) { return null }
    // Only render when selected.
    if (columnTooltipClick.get('columnName') !== columnName ||
        columnTooltipClick.get('itemOverview') !== item.get('overview')) {
      return null
    }

    return <span className='listItemDetail'>
      {item.get('expanded')}
    </span>
  }

  render() {
    return (
      <li>
        <div
          className="listItemHeading"
          onClick={this.detailClick.bind(this)}
        >
          {this.listColorBox()}
          {this.listSymbol()}
          {this.overviewText()}
        </div>
        {this.detailText()}
      </li>
    )
  }
}

module.exports = ReactRedux.connect(
  state => ({
    columnTooltipClick: state.columnTooltipClick,
    analytics: state.analytics,
  }),
  {
    onDetailExpand: ColumnTooltipDetailExpandCreator,
    onDetailCollapse: ColumnTooltipDetailCollapseCreator,
  },
)(TooltipListItem)
