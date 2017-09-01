
function DragCategoryCreator (newY) {
  return {
    type: 'DragCategory',
    newY: newY
  }
}

module.exports = DragCategoryCreator