
function ActivateStoryImageCreator (storyImageIndex) {
  return {
    type: 'ActivateStoryImage',
    storyImageIndex: storyImageIndex,
  }
}

module.exports = ActivateStoryImageCreator