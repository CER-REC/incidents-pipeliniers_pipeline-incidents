
const React = require('react')
const ReactRedux = require('react-redux')

//require('./Workspace.scss')


class Workspace extends React.Component {
  render() {
    return 	<svg width={this.props.viewport.get('x')}
 				height={this.props.viewport.get('y')}>
			</svg>
  }
}

const mapStateToProps = state => {
  return {
    		viewport: state.viewport
		 }
}

module.exports = ReactRedux.connect(mapStateToProps)(Workspace)