const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')


//home button
function homeButton() {
			//console.log(Constants.get('topBar').get('homeIconWidth'))
			//console.log(Constants.getIn(['topBar', 'homeIconWidth']))

			let image = <image xlinkHref='images/home.svg' 
				height = {Constants.getIn(['topBar', 'homeIconHeight'])}
				width = {Constants.getIn(['topBar', 'homeIconWidth'])}
			></image>
			return image
}

//top bar header
class Header extends React.Component {
	render() {
		let transformString = `translate(${Constants.get('leftOuterMargin')},${Constants.get('topOuterMargin')})`
		return (<g transform = {transformString}>
				{homeButton()}

				{/*is width and height needed because of viewport in workspace?*/}
				<svg width="80%" height="100%" xmlnsXlink='http://www.w3.org/1999/xlink'>
			
				<text x="35" y="18" className="heading">Heading</text>
				<text x="35" y="38" className="subpop">subheading</text>				
				
				
				</svg>
				</g>
		);
	}
}




module.exports = Header