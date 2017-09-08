
function DragCategoryEndedCreator (isStarted) {
  return {
    type: 'DragCategoryEnded',
    isStarted: isStarted
  }
}

module.exports = DragCategoryEndedCreator