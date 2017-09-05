
function DragSidebarColumnEndedCreator (isStarted) {
  return {
    type: 'DragSidebarColumnEnded',
    isStarted: isStarted
  }
}

module.exports = DragSidebarColumnEndedCreator