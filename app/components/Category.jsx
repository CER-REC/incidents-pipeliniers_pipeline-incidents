const React = require('react')

const Constants = require('../Constants.js')

class Category extends React.Component {

  label() {
    const labelLines = this.splitHeading(this.props.categoryName)
    if(labelLines.length * Constants.get('singleLineCategoryLabelHeight') > this.props.height) {
      return null
    }

    let currentY = this.props.height/2

    // When labelLines.length = 1 => currentY += Constants.get('singleLineCategoryLabelHeight')/2 
    // When labelLines.length = 2 => currentY won't change
    // When labelLines.length = 3 => currentY -= Constants.get('singleLineCategoryLabelHeight')/2
    currentY += (1 - labelLines.length*0.5) * Constants.get('singleLineCategoryLabelHeight')

    // Decrement just before it's increcemented inside the map.
    currentY -= Constants.get('singleLineCategoryLabelHeight')
 
    return labelLines.map((line) => {
      currentY += Constants.get('singleLineCategoryLabelHeight')
      return <tspan className='activeCategoryLabels'
        y={currentY}
        x={this.props.width + Constants.get('categoryLabelOffset')}>
        {line}
      </tspan>
    })
  }

  render() {

    const transformString = `translate(${this.props.x}, ${this.props.y})`

    // TODO: data-cat attribute is for dev purposes only, delete later!
    return <g transform={transformString}>
      <rect
        width={this.props.width}
        height={this.props.height}
        fill={this.props.colour}
        data-cat={this.props.categoryName}
      />
      <text>
        {this.label()}
      </text>
    </g>
  }

  splitHeading(fullLabel) {
    // TODO: We will need to fetch the category labels from 
    // a translation table to account for french translations.
    //const columnHeading = TranslationTable.getIn(['categoryLabels', this.props.categoryName, language])
    const label = fullLabel

    // No need to split into multiple lines.
    if(typeof(label) === 'number' || 
       label.length <= Constants.get('categoryLabelLineLength')) {
      return [label]
    }

    // Split right at the maxmium allows characters per line.
    if(label[Constants.get('categoryLabelLineLength')] === ' ') {
      return [this.splitHeading(label.substring(0,Constants.get('categoryLabelLineLength'))), 
        this.splitHeading(label.substring(Constants.get('categoryLabelLineLength') + 1))]
    }


    const firstLineSplitPoint = label.substring(0, Constants.get('categoryLabelLineLength')).lastIndexOf(' ')
    
    // TODO: This is a hack just until the translation table is 
    // in place. Delete after the translation table is in place. 
    if(firstLineSplitPoint < 0) {
      return [fullLabel]
    }

    // Split at the closest space.
    return [this.splitHeading(label.substring(0, firstLineSplitPoint)), 
      this.splitHeading(label.substring(firstLineSplitPoint + 1))]
  }
}

module.exports = Category