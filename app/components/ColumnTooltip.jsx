
const React = require('react')
const ReactRedux = require('react-redux')

require('./ColumnTooltip.scss')

const Tr = require('../TranslationTable.js')
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
    return <hr className='separator'/>
  }

  listSymbol(item) {
    let sym = '+'
    if(item.get('expanded') === null) sym = ''
    return <span
      className='PopupPlusSign'>
      {sym}
    </span>
  }

  listText() {
    const items = Tr.getIn(['tooltips', this.props.columnTooltip.get('columnName'), 'detail', this.props.language])
    return items.map(item => {
      return <ColumnTooltipListItem item={item} columnName={this.props.columnTooltip.get('columnName')}/>
    })
  }

  tooltipStyle() {
    return {
      top:WorkspaceComputations.columnTooltipY(),
      left:WorkspaceComputations.columnTooltipX(
        this.props.columnTooltip, 
        this.props.viewport),
    }
  }

  render() {
    // Only render if a tooltip has been summoned
    if(!this.props.columnTooltip.get('isActive')) return null

    return <div 
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
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(ColumnTooltip)