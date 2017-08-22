const React = require('react')
const Constants = require('../Constants.js')

//home button
function homeButton() {
  const image = <image xlinkHref='images/home.svg' 
    height = {Constants.getIn(['topBar', 'homeIconHeight'])}
    width = {Constants.getIn(['topBar', 'homeIconWidth'])}
  ></image>
  return image
}

//top bar header
class Header extends React.Component {
  render() {
    const headerWidth = Constants.getIn(['topBar', 'width'])
    const headerHeight = Constants.getIn(['topBar', 'height'])
    const xHeading = Constants.getIn(['topBar', 'xHeading'])
    const yHeading = Constants.getIn(['topBar', 'yHeading'])
    const xSubpop = Constants.getIn(['topBar', 'xSubpop'])
    const ySubpop = Constants.getIn(['topBar', 'ySubpop'])
    let transformString = `translate(${Constants.get('leftOuterMargin')},${Constants.get('topOuterMargin')})`
    return (<g transform = {transformString}>

      //TODO: create a link for the default state (two bars at the beginning)
      <a href='http://localhost:3001/incident-visualization/' > 
        {homeButton()}
      </a>

      <svg width={headerWidth} height={headerHeight} xmlnsXlink='http://www.w3.org/1999/xlink'>
			
        <text x={xHeading} y={yHeading} className="heading">Heading</text>
        <text x={xSubpop} y={ySubpop} className="subpop">subheading</text>				

      </svg>
    </g>
    )
  }
}




module.exports = Header