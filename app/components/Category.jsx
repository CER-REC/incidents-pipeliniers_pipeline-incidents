const React = require('react')


class Category extends React.Component {

  render() {

    const transformString = `translate(${this.props.x}, ${this.props.y})`

    return <g transform={transformString}>
      <rect
        width={this.props.width}
        height={this.props.height}
        fill={this.props.colour}
      />
    </g>
  }
}

module.exports = Category