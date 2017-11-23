
function ActivateStoryImageCreator (imageList, storyImage) {
  return {
    type: 'ActivateStoryImage',
    imageList: imageList,
    storyImage: storyImage
  }
}

module.exports = ActivateStoryImageCreator