const React = require('react')
const ReactRedux = require('react-redux')

//home image


//home button
const homeButton = () => (
		<button>
			<home />
			<span>home</span>
		</button>
	)

//heading
class Header extends React.Component {
	render() {
		return (<g>
				<image xlinkHref='images/home.svg'></image>
				<text></text>
				<text></text>
				<text></text>
				</g>
		);
	}
}




module.exports = Header