
function ResizeInputCanvasCreator (width, height) {
  return {
    type: 'ResizeInputCanvas',
    width: width,
    height: height,
  }
}

module.exports = ResizeInputCanvasCreator