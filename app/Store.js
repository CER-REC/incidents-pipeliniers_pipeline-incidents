
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer')
const ColumnsReducer = require('./reducers/ColumnsReducer')
const DataReducer = require('./reducers/DataReducer')
const CategoriesReducer = require('./reducers/CategoriesReducer')


const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  columns: ColumnsReducer,
  data: DataReducer,
  categories: CategoriesReducer,
})




module.exports = function () {
  return Redux.createStore(reducers)
}


