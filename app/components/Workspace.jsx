
const React = require('react')
const ReactRedux = require('react-redux')

//require('./Workspace.scss')

const IncidentBar = require('./IncidentBar.jsx')
const Column = require('./Column.jsx')
const SideBar = require('./SideBar.jsx')
const SocialBar = require('./SocialBar.jsx')

class Workspace extends React.Component {


  columns() {
    return this.props.columns.map( (columnName, i) => {
      return <Column columnName={columnName} key={columnName} index={i} />
    }).toArray()
  }

  render() {
    return  <svg width={this.props.viewport.get('x')}
      height={this.props.viewport.get('y')}>

      <IncidentBar/>
      {this.columns()}
      <SideBar/>
      <SocialBar/>

    </svg>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Workspace)