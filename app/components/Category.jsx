const React = require('react')

const Constants = require('../Constants.js')

require('./Category.scss')

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


    let labelClassName = 'inactiveCategoryLabels'
    let filterBoxOffset = 0

    // TODO: Check if the category is hovered-on/selected to assign it
    // with the proper class name. For now, I am assigning a filter box
    // randomly to 20% of the categories for test purposes only. 
    // This will change once the the category hover/selection reducer is inplace.
    const isSelected = Math.random() < 0.2
    if(isSelected) {
      labelClassName = 'activeCategoryLabels'
      filterBoxOffset = Constants.getIn(['filterbox', 'filterBoxOffset'])
    }

    let currentY = (this.props.height/2) - filterBoxOffset
    let lineCount = 0
    currentY += (1 - (labelLines.length/2)) * 
                Constants.get('singleLineCategoryLabelHeight')

    // Decrement just before it's increcemented inside the map.
    currentY -= Constants.get('singleLineCategoryLabelHeight')

    return <g>
      <text>
        {labelLines.map((line) => {
          currentY += Constants.get('singleLineCategoryLabelHeight')
          lineCount += 1
          return <tspan className={labelClassName}
            key={this.props.categoryName + 'CategoryLabelLine' + lineCount}
            y={currentY}
            x={this.props.width + Constants.get('categoryLabelOffset')}>
            {line}
          </tspan>
        })}
      </text>
      {this.filterBox(isSelected, currentY + Constants.getIn(['filterbox', 'labelOffset']))}
    </g>
  }

  filterBox(isSelected, startingY) {
    if(!isSelected) {
      return null
    }

    return <g>
      <g className='filterBoxButton'>
        <rect
          className='filterBoxRect'
          y={startingY}
          x={this.props.width + Constants.get('categoryLabelOffset')}
          width={Constants.getIn(['filterbox', 'filterButtonWidth'])}
          height={Constants.getIn(['filterbox', 'filterButtonHeight'])}>
        </rect>
        <image xlinkHref='images/filter.svg'
          height = {Constants.getIn(['filterbox', 'iconSize'])}
          width = {Constants.getIn(['filterbox', 'iconSize'])}
          x= {
            this.props.width + 
            Constants.get('categoryLabelOffset') + 
            Constants.getIn(['filterbox', 'iconHorizontalOffset'])
          }
          y= {startingY + Constants.getIn(['filterbox', 'filterIconVerticalOffset'])}>
        </image>
        <text
          className = 'filterBox'
          height = {Constants.getIn(['filterbox', 'textHeight'])}
          width =  {Constants.getIn(['filterbox', 'textWidth'])}
          x = {
            this.props.width + 
            Constants.get('categoryLabelOffset') + 
            Constants.getIn(['filterbox', 'iconHorizontalOffset']) + 
            Constants.getIn(['filterbox', 'iconSize']) + 
            Constants.getIn(['filterbox', 'iconTextOffset'])
          }
          y = {startingY + Constants.getIn(['filterbox', 'textVerticalOffset'])}>
          SHOW ONLY
        </text>
      </g>
      <g className='filterBoxButton'>
        <rect
          className='filterBoxRect'
          y={startingY + Constants.getIn(['filterbox', 'lineVerticalOffset'])}
          x={this.props.width + Constants.get('categoryLabelOffset')}
          width={Constants.getIn(['filterbox', 'filterButtonWidth'])}
          height={Constants.getIn(['filterbox', 'filterButtonHeight'])}>
        </rect>
        <image xlinkHref='images/hide_(close).svg' 
          height = {Constants.getIn(['filterbox', 'iconSize'])}
          width = {Constants.getIn(['filterbox', 'iconSize'])}
          x= {this.props.width + Constants.get('categoryLabelOffset') + Constants.getIn(['filterbox', 'iconHorizontalOffset'])}
          y= {startingY + Constants.getIn(['filterbox', 'lineVerticalOffset']) + Constants.getIn(['filterbox', 'filterIconVerticalOffset'])}>
        </image>
        <text
          className = 'filterBox'
          height = {Constants.getIn(['filterbox', 'textHeight'])}
          width =  {Constants.getIn(['filterbox', 'textWidth'])}
          x = {
            this.props.width + 
            Constants.get('categoryLabelOffset') + 
            Constants.getIn(['filterbox', 'iconHorizontalOffset']) + 
            Constants.getIn(['filterbox', 'iconSize']) + 
            Constants.getIn(['filterbox', 'iconTextOffset'])
          }
          y = {
            startingY + 
            Constants.getIn(['filterbox', 'lineVerticalOffset']) + 
            Constants.getIn(['filterbox', 'textVerticalOffset'])
          }>
          HIDE
        </text>
      </g>
      <g className='filterBoxButton'>
        <rect
          className='filterBoxRect'
          y={startingY}
          x={
            this.props.width + 
            Constants.get('categoryLabelOffset') + 
            Constants.getIn(['filterbox', 'filterButtonWidth'])
          }
          width={Constants.getIn(['filterbox', 'dragButtonWidth'])}
          height={Constants.getIn(['filterbox', 'dragButtonHeight'])}>
        </rect>
        <image xlinkHref='images/vertical_drag.svg' 
          className = 'verticalDrag'
          height = {Constants.getIn(['filterbox', 'dragIconHeight'])}
          width = {Constants.getIn(['filterbox', 'dragIconWidth'])}
          x= {
            this.props.width + 
            Constants.get('categoryLabelOffset') + 
            Constants.getIn(['filterbox', 'filterButtonWidth']) + 
            Constants.getIn(['filterbox', 'dragIconHorizontalOffset'])
          }
          y= {startingY + Constants.getIn(['filterbox', 'dragIconVerticalOffset'])}>
        </image>
      </g>
      <line className='filterBoxLine'
        x1={this.props.width}
        y1={startingY + Constants.getIn(['filterbox', 'lineVerticalOffset'])}
        x2={this.props.width + Constants.get('categoryLabelOffset')}
        y2={startingY + Constants.getIn(['filterbox', 'lineVerticalOffset'])}>
      </line>
    </g>
  }

  render() {
    const transformString = `translate(${this.props.x}, ${this.props.y})`
    return <g 
      transform={transformString}>
      <rect
        width={this.props.width}
        height={this.props.height}
        fill={this.props.colour}
      />
      {this.label()}
    </g>
  }

  splitHeading(fullLabel) {
    // TODO: We will need to fetch the category labels from 
    // a translation table to account for french translations.
    const label = fullLabel.toString().toUpperCase()

    // No need to split into multiple lines.
    if(label.length <= Constants.get('categoryLabelLineLength')) {
      return [label]
    }

    // Split (' ' or '-') right at the maxmium allows characters per line.
    // Case 1: split right at the line length limit.
    if(label[Constants.get('categoryLabelLineLength')] === ' ' || 
       label[Constants.get('categoryLabelLineLength')] === '-') {
      return [this.splitHeading(label
        .substring(0,Constants.get('categoryLabelLineLength')))]
        .concat(this.splitHeading(label
          .substring(Constants.get('categoryLabelLineLength') + 1)))
    }

    // Case 2: split at the closest space or dash.
    let firstLineSplitPoint = label
      .substring(0, Constants.get('categoryLabelLineLength')).lastIndexOf(' ')
    if(firstLineSplitPoint < 0) {
      firstLineSplitPoint = label
        .substring(0, Constants.get('categoryLabelLineLength')).lastIndexOf('-')
    }

    return [this.splitHeading(label.substring(0, firstLineSplitPoint))].concat( 
      this.splitHeading(label.substring(firstLineSplitPoint + 1)))
  }
}

module.exports = Category