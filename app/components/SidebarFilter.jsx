const React = require('react')
const ReactRedux = require('react-redux')

const Column = require('./Column.jsx')
const Sidebar = require('./Sidebar.jsx')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const Constants = require('../Constants.js')

require('./Sidebar.scss')

class SidebarFilter extends React.Component {

  render() {

  }
}

const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
    sidebarColumnHover: state.sidebarColumnHover,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Sidebar)