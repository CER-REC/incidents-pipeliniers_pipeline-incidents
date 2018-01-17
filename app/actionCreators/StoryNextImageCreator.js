function StoryNextImageCreator (count) {
  return {
    type: 'NextImage',
    count: count,
  }
}

module.exports = StoryNextImageCreator