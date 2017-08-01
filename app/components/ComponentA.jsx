
const React = require('react')




class ComponentA extends React.Component {
  render() {
    return <h1>Component A</h1>;
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }

}

module.exports = ComponentA