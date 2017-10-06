
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
    return  <text
      className='PopupHeading'
      x={Constants.getIn(['columnTooltip', 'leftMargin'])}
      y={Constants.getIn(['columnTooltip', 'titleTopMargin'])}>
      COMPANY
    </text>
  }

  description() {
    return <text
      className='PopupOverview'
      x={Constants.getIn(['columnTooltip', 'leftMargin'])}
      y={Constants.getIn(['columnTooltip', 'descriptionTopMargin'])}>
      There are 39 companies that NEB deals with.
    </text>
  }

  separator() {
    return <line
      stroke='#000'
      strokeWidth='0.5'
      x1={Constants.getIn(['columnTooltip', 'leftMargin'])}
      y1={Constants.getIn(['columnTooltip', 'separatorLineY'])}
      x2={Constants.getIn(['columnTooltip', 'separatorLineRightMargin'])}
      y2={Constants.getIn(['columnTooltip', 'separatorLineY'])}/>
  }

  listText() {
    const items = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10]
    let initialY = 44
    return items.map(item => {
      initialY += 14
      return <g>
        <text
          className='PopupPlusSign'
          x={10}
          y={initialY}>
          +
        </text>
        <text 
          className='PopupText'
          x={24}
          y={initialY - 3}>
          2193914 Canada Limited
        </text>           
      </g>
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

  svgHeight() {
    return 604
  }

  render() {
    return <div 
      className='tooltip'
      style={this.tooltipStyle()}>
      <svg 
        x={this.tooltipX()} 
        y={this.tooltipY()}
        width={Constants.getIn(['columnTooltip', 'width'])}
        height={this.svgHeight()}>
        {this.title()}
        {this.description()}
        {this.separator()}
        {this.listText()}
      </svg>
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