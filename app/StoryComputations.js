const MemoizeImmutable = require('memoize-immutable')

const Constants = require('./Constants.js')

const StoryComputations = {

  storyWindowHeight(viewport) {
    return viewport.get('y') - 
      Constants.getIn(['storyThumbnailDimensions', 'windowYOffset']) + 
      Constants.getIn(['storyThumbnailDimensions', 'windowShadowOffset'])
  },

  storyTutorialImageHeight(viewport) {
    return StoryComputations.storyWindowHeight(viewport) - 
      (2*(Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonOffset']) + 
       Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize']))) -
      Constants.getIn(['storyThumbnailDimensions', 'windowShadowOffset'])
  },

  storyTutorialImageWidth(viewport) {
    return viewport.get('x') - 
      Constants.getIn(['storyThumbnailDimensions', 'windowShadowOffset']) -
      ((Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize']) + 
      Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonOffset'])) * 2)
  },

  storyCloseButtonX(viewport) {
    return viewport.get('x') - 
      Constants.getIn(['storyThumbnailDimensions', 'windowShadowOffset']) - 
      Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize']) - 
      Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonOffset'])
  },

  storyIndicatorDotY(viewport) {
    return (viewport.get('y') - 
      Constants.getIn(['storyThumbnailDimensions', 'windowYOffset']) -
      Constants.getIn(['storyThumbnailDimensions', 'windowCloseButtonSize']))
  },

  storyIndicatorDotX(viewport) {
    return viewport.get('x') / 2

  },

}




const MemoizedComputations = {}

for (const name of Object.keys(StoryComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(StoryComputations[name])
}

module.exports = MemoizedComputations