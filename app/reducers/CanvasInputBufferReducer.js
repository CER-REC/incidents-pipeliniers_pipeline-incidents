// const Immutable = require('immutable')

// const Constants = require('../Constants.js')


// NB: Unlike other state objects, this one stores a canvas element
// The input buffer is drawn to when we render the canvas

const CanvasInputBufferReducer = (state = [], action) => {

  switch(action.type) {

  case 'SetInputBuffer':
    return action.inputBuffer
  default:
    return state
  }




}


module.exports = CanvasInputBufferReducer