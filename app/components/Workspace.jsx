
const React = require('react')
const ReactRedux = require('react-redux')
const Header = require('./header.jsx')

//require('./Workspace.scss')


class Workspace extends React.Component {
  render() {
    return 	<svg width={this.props.viewport.get('x')}
 				height={this.props.viewport.get('y')}
 				xmlnsXlink='http://www.w3.org/1999/xlink'>


				<Header />
				
			</svg>

  }
}

const mapStateToProps = state => {
  return {
    		viewport: state.viewport
		 }
}

module.exports = ReactRedux.connect(mapStateToProps)(Workspace)