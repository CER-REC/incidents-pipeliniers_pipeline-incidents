const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const CategoryHoverStateCreator = require('../actionCreators/CategoryHoverStateCreator.js')
const CategoryUnhoverStateCreator = require('../actionCreators/CategoryUnhoverStateCreator.js')

require('./Category.scss')
require('../styles/Fonts.scss')

const COLUMN_TYPE = {
  SIDEBAR: 'SIDEBAR',
  WORKSPACE: 'WORKSPACE'
}

class Category extends React.Component {

  // Do not render category labels for sidebar columns.
  label() {
    if(this.props.columnType === COLUMN_TYPE.SIDEBAR) {
      return null
    }

    const labelLines = this.splitHeading(this.props.categoryName)
    if(labelLines.length * Constants.get('singleLineCategoryLabelHeight') > this.props.height) {
      return null
    }

    let currentY = this.props.height/2
    let lineCount = 0
    // When labelLines.length = 1 => currentY += Constants.get('singleLineCategoryLabelHeight')/2 
    // When labelLines.length = 2 => currentY won't change
    // When labelLines.length = 3 => currentY -= Constants.get('singleLineCategoryLabelHeight')/2
    currentY += (1 - labelLines.length*0.5) * Constants.get('singleLineCategoryLabelHeight')

    // Decrement just before it's increcemented inside the map.
    currentY -= Constants.get('singleLineCategoryLabelHeight')

    return labelLines.map((line) => {
      currentY += Constants.get('singleLineCategoryLabelHeight')
      lineCount += 1
      return <tspan className='activeCategoryLabels'
        key={this.props.categoryName + 'CategoryLabelLine' + lineCount}
        y={currentY}
        x={this.props.width + Constants.get('categoryLabelOffset')}>
        {line}
      </tspan>
    })
  }

  splitHeading(fullLabel) {
    // TODO: We will need to fetch the category labels from 
    // a translation table to account for french translations.
    const label = fullLabel.toString().toUpperCase()

    // No need to split into multiple lines.
    if(label.length <= Constants.get('categoryLabelLineLength')) {
      return [label]
    }

    // Split (on spaces or dashes) right at the maxmium allows characters per line.
    // Case 1: split right at the line length limit.
    if(label[Constants.get('categoryLabelLineLength')] === ' ' || 
       label[Constants.get('categoryLabelLineLength')] === '-') {
      return [this.splitHeading(label.substring(0,Constants.get('categoryLabelLineLength')))].concat( 
        this.splitHeading(label.substring(Constants.get('categoryLabelLineLength') + 1)))
    }

    // Case 2: split at the closest space or dash.
    let firstLineSplitPoint = label.substring(0, Constants.get('categoryLabelLineLength')).lastIndexOf(' ')
    if(firstLineSplitPoint < 0) {
      firstLineSplitPoint = label.substring(0, Constants.get('categoryLabelLineLength')).lastIndexOf('-')
    }

    return [this.splitHeading(label.substring(0, firstLineSplitPoint))].concat( 
      this.splitHeading(label.substring(firstLineSplitPoint + 1)))
  }

  handleMouseEnter() {
    this.props.onMouseEnter(this.props.columnName, this.props.categoryName)
    console.log('handler works')
  }
  handleMouseLeave() {
    this.props.onMouseLeave()
  }

  categoryHover() {
    let strokeWidth
    let fill

    if (this.props.categoryName === this.props.categoryHoverState.get('categoryName') &&
      this.props.columnName === this.props.categoryHoverState.get('columnName')) {
      console.log(this.props.categoryName)
      strokeWidth = '1px'
      fill = 'black'
      return strokeWidth, fill
    } 
    else {
      strokeWidth = '0px'
      fill = '#666666'
      return strokeWidth, fill
    }
  }

  render() {
    const transformString = `translate(${this.props.x}, ${this.props.y})`

    return <g transform={transformString}>

      <rect 
        strokeWidth={this.props.strokeWidth}
        width={this.props.width}
        height={this.props.height}
        fill={this.props.colour}
        className='Category'
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      />
      <text fill={this.props.fill}>
        {this.label()}
      </text>
    </g> 
  }
}


const mapStateToProps = state => {
  return {
    categoryHoverState: state.categoryHoverState,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onMouseEnter: (columnName, categoryName) => {
      dispatch(CategoryHoverStateCreator(columnName, categoryName))
    },
    onMouseLeave: () => {
      dispatch(CategoryUnhoverStateCreator())
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Category)
