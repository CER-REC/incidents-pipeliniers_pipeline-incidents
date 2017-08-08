const React = require('react')


class Category extends React.Component {

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
    </g>
  }
}

module.exports = Category