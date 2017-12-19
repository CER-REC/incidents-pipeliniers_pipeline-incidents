
function ActivateStoryImageCreator (storyImage) {
  return {
    type: 'ActivateStoryImage',
    storyImage: storyImage,
  }
}

module.exports = ActivateStoryImageCreator