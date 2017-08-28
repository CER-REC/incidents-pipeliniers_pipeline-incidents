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

    // TODO: Check if the category is hovered-on/selected to assign it
    // with the proper class name. For now, I am assigning a filter box
    // randomly to 20% of the categories for test purposes only. 
    // This will change once the the category hover/selection reducer is inplace.
    let labelClassName = 'inactiveCategoryLabels'
    let filterBoxOffset = 0
    const isSelected = Math.random() < 0.2
    if(isSelected) {
      labelClassName = 'activeCategoryLabels'
      filterBoxOffset = 13.25
    }

    let currentY = this.props.height/2 - filterBoxOffset
    let lineCount = 0
    currentY += (1 - labelLines.length*0.5) * Constants.get('singleLineCategoryLabelHeight')

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
      {this.filterBox(isSelected, currentY + 3)}
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
          width={56}
          height={13}>
        </rect>
        <image xlinkHref='images/filter.svg'
          height = {7}
          width = {7}
          x= {this.props.width + Constants.get('categoryLabelOffset') + 3}
          y= {startingY + 3}>
        </image>
        <text
          className = 'filterBox'
          height = {7}
          width =  {40}
          x = {this.props.width + Constants.get('categoryLabelOffset') + 3 + 10}
          y = {startingY + 9.5}>
          SHOW ONLY
        </text>
      </g>
      <g className='filterBoxButton'>
        <rect
          className='filterBoxRect'
          y={startingY + 13.5}
          x={this.props.width + Constants.get('categoryLabelOffset')}
          width={56}
          height={13}>
        </rect>
        <image xlinkHref='images/hide_(close).svg' 
          height = {7}
          width = {7}
          x= {this.props.width + Constants.get('categoryLabelOffset') + 3}
          y= {startingY + 13.5 + 3}>
        </image>
        <text
          className = 'filterBox'
          height = {7}
          width =  {40}
          x = {this.props.width + Constants.get('categoryLabelOffset') + 3 + 10}
          y = {startingY + 13.5 + 3 + 6.5}>
          HIDE
        </text>
      </g>
      <g className='filterBoxButton'>
        <rect
          className='filterBoxRect'
          y={startingY}
          x={this.props.width + Constants.get('categoryLabelOffset') + 56}
          width={10}
          height={26.5}>
        </rect>
        <image xlinkHref='images/vertical_drag.svg' 
          className = 'verticalDrag'
          height = {15.3}
          width = {6.5}
          x= {this.props.width + Constants.get('categoryLabelOffset') + 56 + 1.75}
          y= {startingY + 6}>
        </image>
      </g>
      <line className='filterBoxLine'
        x1={this.props.width}
        y1={startingY + 13.5}
        x2={this.props.width + Constants.get('categoryLabelOffset')}
        y2={startingY + 13.5}>
      </line>
    </g>
  }

  render() {
    const transformString = `translate(${this.props.x}, ${this.props.y})`

    return <g transform={transformString}>
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