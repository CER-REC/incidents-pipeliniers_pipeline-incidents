
function DragColumnEndedCreator (isStarted) {
  return {
    type: 'DragColumnEnded',
    isStarted: isStarted
  }
}

export default DragColumnEndedCreator