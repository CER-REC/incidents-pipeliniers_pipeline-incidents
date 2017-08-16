
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer')
const ColumnsReducer = require('./reducers/ColumnsReducer')
const DataReducer = require('./reducers/DataReducer')
const CategoriesReducer = require('./reducers/CategoriesReducer')
const EmptyCategoriesReducer = require('./reducers/EmptyCategoriesReducer')
const CanvasInputBufferReducer = require('./reducers/CanvasInputBufferReducer')



const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  columns: ColumnsReducer,
  data: DataReducer,
  categories: CategoriesReducer,
  showEmptyCategories: EmptyCategoriesReducer,
  canvasInputBuffer: CanvasInputBufferReducer,
})

module.exports = function () {
  return Redux.createStore(reducers)
}


