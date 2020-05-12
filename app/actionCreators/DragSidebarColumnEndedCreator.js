
function DragSidebarColumnEndedCreator (isStarted) {
  return {
    type: 'DragSidebarColumnEnded',
    isStarted: isStarted
  }
}

export default DragSidebarColumnEndedCreator