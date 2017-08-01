
const React = require('react')
const ReactRedux = require('react-redux')

require('./ComponentA.scss')

class ComponentA extends React.Component {
  render() {
    return <h1 className="ComponentA">Component A {this.props.ViewportDimensions.x}</h1>;
  }
}

const mapStateToProps = state => {
  return {
    ViewportDimensions: state.ViewportDimensions
  }

}

module.exports = ReactRedux.connect(mapStateToProps)(ComponentA)