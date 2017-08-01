const Immutable = require('Immutable')


function ScreenResized (x, y) {

  return Immutable.Map({
    type: 'ScreenResized',
    x: x,
    y: y
  })
}

module.exports = ScreenResized