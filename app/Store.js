
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer')
const ColumnsReducer = require('./reducers/ColumnsReducer')


const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  columns: ColumnsReducer,
})




module.exports = function () {
  return Redux.createStore(reducers)
}


