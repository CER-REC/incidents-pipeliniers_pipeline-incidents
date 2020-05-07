
function StorySelectedCreator (storyID) {
  return {
    type: 'StorySelected',
    storyID: storyID,
  }
}

export default StorySelectedCreator