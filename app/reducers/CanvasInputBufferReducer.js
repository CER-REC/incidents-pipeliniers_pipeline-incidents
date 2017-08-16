// const Immutable = require('immutable')

// const Constants = require('../Constants.js')


// NB: Unlike other state objects, this one stores a canvas element
// The input buffer is drawn to when we render the canvas

const CanvasInputBufferReducer = (state = document.createElement('canvas'), action) => {

  switch(action.type) {

  case 'ResizeInputCanvas':

    state.setAttribute('height', action.height)
    state.setAttribute('width', action.width)

    return state
  default:
    return state
  }




}


module.exports = CanvasInputBufferReducer