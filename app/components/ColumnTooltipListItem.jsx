
const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')


require('./ColumnTooltipListItem.scss')

const ColumnTooltipDetailExpandCreator = require('../actionCreators/ColumnTooltipDetailExpandCreator.js')
const ColumnTooltipDetailCollapseCreator = require('../actionCreators/ColumnTooltipDetailCollapseCreator.js')

class ColumnTooltipListItem extends React.Component {

  detailClick(e) {
    this.props.analytics.reportEvent(`${Constants.getIn(['analyticsCategory','questionMark'])}`,`${this.props.item.get('overview')} detail overview`)
    e.stopPropagation()
    e.preventDefault()

    if(this.props.columnTooltipClick.get('columnName') === this.props.columnName &&
       this.props.columnTooltipClick.get('itemOverview') === this.props.item.get('overview'))
      this.props.onDetailCollapse()
    else
      this.props.onDetailExpand(this.props.columnName, this.props.item.get('overview'))
  }

  listSymbol() {
    let sym = '+'
    if(this.props.item.get('expanded') === null) {
      sym = ''
    }
    else if(this.props.columnTooltipClick.get('columnName') === this.props.columnName &&
            this.props.columnTooltipClick.get('itemOverview') === this.props.item.get('overview')) {
      sym = '-'     
    }
    return <span
      className='PopupPlusSign'
      onClick={this.detailClick.bind(this)}>
      {sym}
    </span>
  }

  overviewText() {
    let textClassName = 'PopupText'
    if(this.props.columnTooltipClick.get('columnName') === this.props.columnName &&
            this.props.columnTooltipClick.get('itemOverview') === this.props.item.get('overview')) {
      textClassName += ' active'
    }
    return <span 
      className={textClassName}
      onClick={this.detailClick.bind(this)}
    >
      {this.props.item.get('overview')}
    </span>
  }

  detailText() {
    // Only render when selected.
    if(this.props.columnTooltipClick.get('columnName') !== this.props.columnName ||
            this.props.columnTooltipClick.get('itemOverview') !== this.props.item.get('overview')) {
      return null
    }

    return <span className='PopupDetailText'>
      {this.props.item.get('expanded')}
    </span>
  }

  // This is necessary to compensate for the empty space
  // that is left by moving the (relatively positioned) tooltip
  // to the top of viewport.
  setupBottomMargin() {
    const height = document.getElementById('columnTooltip').clientHeight
    document.getElementById('columnTooltip').style.marginBottom = `${-height}px`
  }

  componentDidMount() {
    this.setupBottomMargin()
  }

  componentDidUpdate() {
    this.setupBottomMargin()
  }

  render() {
    return <div 
      className='listItem'>
      {this.listSymbol()}
      {this.overviewText()}
      {this.detailText()}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    language: state.language,
    columnTooltipClick: state.columnTooltipClick,
    analytics: state.analytics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDetailExpand: (columnName, itemOverview) => {
      dispatch(ColumnTooltipDetailExpandCreator(columnName, itemOverview))
    },
    onDetailCollapse: () => {
      dispatch(ColumnTooltipDetailCollapseCreator())
    },
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ColumnTooltipListItem)