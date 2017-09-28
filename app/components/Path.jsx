const React = require('react')

class Path extends React.Component {

  render() {
    return <path 
      d = { this.props.d }
      fill = { this.props.fillColour }
      className = 'ColumnPaths'
      fillOpacity = { this.props.fillOpacity }
    />
  }
}

module.exports = Path