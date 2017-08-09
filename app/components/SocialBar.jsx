const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')

require('../styles/Common.scss')
require('../styles/Colours.scss')

//social bar
class SocialBar extends React.Component {
  render() {
    let transformSocialBar = `translate(${Constants.get('leftOuterMargin')},${Constants.get('topOuterMargin')})`
    return (
      <svg
        width={Constants.getIn(['SocialBar', 'height'])} 
        height={Constants.getIn(['SocialBar', 'width'])} 
        xmlnsXlink='http://www.w3.org/1999/xlink'>
        <rect x="0" y="0" width="23px" height="115px" fill='#555556'/>
        <g transform = {transformSocialBar}>
          <image height = '16px' width = '16px' transform = {'translate(-1.5,0)'} xlinkHref='images/email.svg'></image>
          <image height = '16px' width = '16px' transform = {'translate(-1.5,23)'} xlinkHref='images/linkedin.svg'></image>
          <image height = '16px' width = '16px' transform = {'translate(-1.5,46)'} xlinkHref='images/twitter.svg'></image>
          <image height = '16px' width = '16px' transform = {'translate(-1.5,69)'} xlinkHref='images/download.svg'></image>
          <image height = '16px' width = '16px' transform = {'translate(-1.5,92)'} xlinkHref='images/facebook.svg'></image>
        </g>
      </svg>
    )
  }
}


module.exports = SocialBar