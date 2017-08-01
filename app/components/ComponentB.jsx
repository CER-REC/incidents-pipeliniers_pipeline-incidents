
const React = require('react')


require('./ComponentB.scss')


class ComponentB extends React.Component {
  render() {
    return <h1 className="ComponentB">Component B</h1>;
  }
}

module.exports = ComponentB