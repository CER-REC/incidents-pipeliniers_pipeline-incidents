
const Redux = require('redux')

const ViewportDimensions = require('./reducers/ViewportDimensions')


const reducers = Redux.combineReducers({
  ViewportDimensions
})




module.exports = function () {
  return Redux.createStore(reducers)
}


