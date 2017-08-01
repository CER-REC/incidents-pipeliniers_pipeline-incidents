
const Constants = require('../Constants')

const ViewportDimensions = (previousState = Constants.defaultViewportDimensions, action) => {

  switch(action.type) {

    case 'ScreenResized':
      return {
        x: action.x,
        y: action.y
      }

      break
    default:
      return previousState
  }




}


module.exports = ViewportDimensions