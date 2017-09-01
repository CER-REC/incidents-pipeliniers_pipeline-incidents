const React = require('react')
const Constants = require('../Constants.js')

//home button
function homeButton() {
  const image = <image xlinkHref='images/home.svg' 
    height = {Constants.getIn(['topBar', 'headerIconHeight'])}
    width = {Constants.getIn(['topBar', 'headerIconWidth'])}
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
    const methodologyIconY = Constants.getIn(['topBar', 'methodologyIconY'])
    let transformString = `translate(${Constants.get('leftOuterMargin')},${Constants.get('topOuterMargin')})`
    return (<g transform = {transformString}>


      //TODO: create a link for the default state (two bars at the beginning)
      // home button currently refreshes the page
      <a href='http://localhost:3001/incident-visualization/' > 
        {homeButton()}
      </a>

      //TODO: change link once we get PDF
      <a href='https://google.ca' target="_blank">
        <image 
          height = {Constants.getIn(['topBar', 'headerIconHeight'])}
          width = {Constants.getIn(['topBar', 'headerIconWidth'])}       
          y = {methodologyIconY}
          xlinkHref='images/methodology-icon-black.svg'
        ></image>
      </a>
      <svg width={headerWidth} height={headerHeight} xmlnsXlink='http://www.w3.org/1999/xlink'>
      
        <text x={xHeading} y={yHeading} className="heading"></text>
        <text x={xSubpop} y={ySubpop} className="subpop"></text>

      </svg>
    </g>
    )
  }
}




module.exports = Header