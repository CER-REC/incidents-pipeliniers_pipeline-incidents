
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer.js')
const ColumnsReducer = require('./reducers/ColumnsReducer.js')
const DataReducer = require('./reducers/DataReducer.js')
const CategoriesReducer = require('./reducers/CategoriesReducer.js')
const EmptyCategoriesReducer = require('./reducers/EmptyCategoriesReducer.js')
const IncidentSelectionStateReducer = require('./reducers/IncidentSelectionStateReducer.js')
const PinnedIncidentReducer = require('./reducers/PinnedIncidentReducer.js')
const SidebarColumnHoverReducer = require('./reducers/SidebarColumnHoverReducer.js')
const ColumnDragReducer = require('./reducers/ColumnDragReducer.js')
const SidebarColumnDragReducer = require('./reducers/SidebarColumnDragReducer.js')
const LanguageReducer = require('./reducers/LanguageReducer.js')
const IncidentDragStateReducer = require('./reducers/IncidentDragStateReducer.js')

const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  columns: ColumnsReducer,
  data: DataReducer,
  categories: CategoriesReducer,
  showEmptyCategories: EmptyCategoriesReducer,
  selectedIncident: IncidentSelectionStateReducer,
  pinnedIncidents: PinnedIncidentReducer,
  sidebarColumnHover: SidebarColumnHoverReducer,
  columnDragStatus: ColumnDragReducer,
  sidebarDragStatus: SidebarColumnDragReducer,
  language: LanguageReducer,
  incidentDragState: IncidentDragStateReducer,
})

module.exports = function () {
  return Redux.createStore(reducers)
}


