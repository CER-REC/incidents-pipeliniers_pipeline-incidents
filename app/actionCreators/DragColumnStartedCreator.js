
function DragColumnStartedCreator (isStarted, columnName, oldX, newX, offset) {
  return {
    type: 'DragColumnStarted',
    isStarted: isStarted,
    columnName: columnName,
    oldX: oldX,
    newX: newX,
    offset: offset
  }
}

export default DragColumnStartedCreator