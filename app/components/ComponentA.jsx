
const React = require('react')
const ReactRedux = require('react-redux')

require('./ComponentA.scss')

class ComponentA extends React.Component {
  render() {
    return <h1 className="ComponentA">
      Component A {this.props.viewport.get('x')}
    </h1>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }

}

module.exports = ReactRedux.connect(mapStateToProps)(ComponentA)