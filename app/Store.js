
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer')
const EmptyCategoriesReducer = require('./reducers/EmptyCategoriesReducer')


const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  showEmptyCategories: EmptyCategoriesReducer
})

module.exports = function () {
  return Redux.createStore(reducers)
}


