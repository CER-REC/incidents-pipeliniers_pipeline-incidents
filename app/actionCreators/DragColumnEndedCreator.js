
function DragColumnEndedCreator (isStarted) {
  return {
    type: 'DragColumnEnded',
    isStarted: isStarted
  }
}

module.exports = DragColumnEndedCreator