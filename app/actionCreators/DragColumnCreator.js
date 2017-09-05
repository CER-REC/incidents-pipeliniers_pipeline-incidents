
function DragColumnCreator (newX) {
  return {
    type: 'DragColumn',
    newX: newX
  }
}

module.exports = DragColumnCreator