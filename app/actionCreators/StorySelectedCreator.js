
function StorySelectedCreator (storyRow, storyPosition) {
  return {
    type: 'StorySelected',
    storyRow: storyRow,
    storyPosition: storyPosition
  }
}

module.exports = StorySelectedCreator