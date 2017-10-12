
// When true: we should render in screenshot mode
const ScreenshotModeReducer = (state = false, action) => {

  switch(action.type) {

  case 'SetFromRouterState':
    return action.screenshotMode

  default:
    return state
  }

}


module.exports = ScreenshotModeReducer  