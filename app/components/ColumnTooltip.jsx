
const React = require('react')
const ReactRedux = require('react-redux')

require('./ColumnTooltip.scss')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const DisclaimerDismissedCreator = require('../actionCreators/DisclaimerDismissedCreator.js')

class ColumnTooltip extends React.Component {

  closeButtonClick() {
    this.props.disclaimerDismissed()
  }

  title() {
    return <p
      className='PopupHeading'>
      COMPANY
    </p>
  }

  description() {
    return <p
      className='PopupOverview'>
      There are 39 companies that NEB deals with.
    </p>
  }

  separator() {
    return <hr className='separator'/>
  }

  listText() {
    const items = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10]
    return items.map(item => {
      return <p style={{marginBottom:'-10px'}}>
        <span
          className='PopupPlusSign'>
          + 
        </span>
        <span className='PopupText'>
         Test
        </span>
      </p>
    })
  }

  tooltipY() {
    return WorkspaceComputations.topBarHeight() + 
      Constants.getIn(['questionMark', 'yOffset'])
  }

  tooltipX() {
    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', 'province'])

    return columnMeasurements.get('x')
  }

  tooltipStyle() {
    return {
      top:this.tooltipY(),
      left:this.tooltipX(),
    }
  }

  render() {
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
    showEmptyCategories: state.showEmptyCategories,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    disclaimerDismissed: () => {
      dispatch(DisclaimerDismissedCreator())
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ColumnTooltip)