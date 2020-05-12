
function DragCategoryEndedCreator (isStarted) {
  return {
    type: 'DragCategoryEnded',
    isStarted: isStarted
  }
}

export default DragCategoryEndedCreator