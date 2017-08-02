const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')

//home image


//home button
function homeButton() {
			console.log(Constants.get('topBar').get('homeIconWidth'))
			console.log(Constants.getIn(['topBar', 'homeIconWidth']))

			let image = <image xlinkHref='images/home.svg' 
				height = {Constants.getIn(['topBar', 'homeIconHeight'])}
				width = {Constants.getIn(['topBar', 'homeIconWidth'])}
			></image>
			return image
}

//heading
class Header extends React.Component {
	render() {
		let transformString = `translate(${Constants.get('leftOuterMargin')},${Constants.get('topOuterMargin')})`
		return (<g transform = {transformString}>
				{homeButton()}
				<text></text>
				<text></text>
				<text></text>
				</g>
		);
	}
}




module.exports = Header