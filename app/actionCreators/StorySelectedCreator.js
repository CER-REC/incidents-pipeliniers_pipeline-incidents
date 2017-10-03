
function StorySelectedCreator (storyID) {
  return {
    type: 'StorySelected',
    storyID: storyID,
  }
}

module.exports = StorySelectedCreator