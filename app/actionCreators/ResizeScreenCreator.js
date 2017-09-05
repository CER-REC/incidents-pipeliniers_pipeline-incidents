
function ResizeScreenCreator (x, y) {
  return {
    type: 'ResizeScreen',
    x: x,
    y: y
  }
}

module.exports = ResizeScreenCreator