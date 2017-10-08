
const React = require('react')
const ReactRedux = require('react-redux')

require('./ColumnTooltipListItem.scss')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const ColumnTooltipDetailClickCreator = require('../actionCreators/ColumnTooltipDetailClickCreator.js')

class ColumnTooltipListItem extends React.Component {

  detailClick() {
    this.props.onDetailClicked(this.props.columnName, this.props.item.get('overview'))
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
      textClassName = 'PopupText_Active'
    }
    return <span 
      className={textClassName}>
      {this.props.item.get('overview')}
    </span>
  }

  detailText() {
    // Only render when selected.
    if(this.props.columnTooltipClick.get('columnName') !== this.props.columnName ||
            this.props.columnTooltipClick.get('itemOverview') !== this.props.item.get('overview')) {
      return null
    }

    return <div>
      <div
        className='detailContainer'>
        <span
          className='PopupDetailText'>
          {this.props.item.get('expanded')}
        </span>
      </div>
    </div>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDetailClicked: (columnName, itemOverview) => {
      dispatch(ColumnTooltipDetailClickCreator(columnName, itemOverview))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ColumnTooltipListItem)