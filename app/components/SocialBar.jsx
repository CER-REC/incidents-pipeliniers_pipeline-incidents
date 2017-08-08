const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')

//image icon constants
function emailImage() {
  const emailImage = <image xlinkHref='images/email.svg' 
    height = {Constants.getIn(['socialBar', 'iconSize'])}
    width = {Constants.getIn(['socialBar', 'iconSize'])}
  ></image>
  return emailImage
}



//social bar
class SocialBar extends React.Component {
  render() {
    let transformString = `translate(${Constants.get('leftOuterMargin')},${Constants.get('topOuterMargin')})`
    return (<g transform = {transformString}>
      {emailImage()}
    </g>
    )
  }
}


module.exports = SocialBar