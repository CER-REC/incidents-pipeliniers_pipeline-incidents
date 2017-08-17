
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer')
const ColumnsReducer = require('./reducers/ColumnsReducer')
const DataReducer = require('./reducers/DataReducer')
const CategoriesReducer = require('./reducers/CategoriesReducer')
const EmptyCategoriesReducer = require('./reducers/EmptyCategoriesReducer')
const IncidentSelectionStateReducer = require('./reducers/IncidentSelectionStateReducer')



const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  columns: ColumnsReducer,
  data: DataReducer,
  categories: CategoriesReducer,
  showEmptyCategories: EmptyCategoriesReducer,
  selectedIncident: IncidentSelectionStateReducer,
})

module.exports = function () {
  return Redux.createStore(reducers)
}


