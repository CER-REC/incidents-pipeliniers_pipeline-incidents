
function DragSidebarColumnStartedCreator (isStarted, columnName, oldX, newX, offset) {
  return {
    type: 'DragSidebarColumnStarted',
    isStarted: isStarted,
    columnName: columnName,
    oldX: oldX,
    newX: newX,
    offset: offset
  }
}

module.exports = DragSidebarColumnStartedCreator