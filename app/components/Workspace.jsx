
const React = require('react')
const ReactRedux = require('react-redux')

//require('./Workspace.scss')

const IncidentBar = require('./IncidentBar.jsx')
const SideBar = require('./SideBar.jsx')
const SocialBar = require('./SocialBar.jsx')

class Workspace extends React.Component {
  render() {
    return  <svg width={this.props.viewport.get('x')}
      height={this.props.viewport.get('y')}>

      <IncidentBar/>
      <SideBar/>
      <SocialBar/>

    </svg>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Workspace)