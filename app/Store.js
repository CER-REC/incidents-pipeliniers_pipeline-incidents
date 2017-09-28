
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer.js')
const ColumnsReducer = require('./reducers/ColumnsReducer.js')
const DataReducer = require('./reducers/DataReducer.js')
const CategoriesReducer = require('./reducers/CategoriesReducer.js')
const EmptyCategoriesReducer = require('./reducers/EmptyCategoriesReducer.js')
const IncidentSelectionStateReducer = require('./reducers/IncidentSelectionStateReducer.js')
const PinnedIncidentReducer = require('./reducers/PinnedIncidentReducer.js')
const CategoryHoverStateReducer = require('./reducers/CategoryHoverStateReducer.js')
const SidebarColumnHoverReducer = require('./reducers/SidebarColumnHoverReducer.js')
const ColumnDragReducer = require('./reducers/ColumnDragReducer.js')
const SidebarColumnDragReducer = require('./reducers/SidebarColumnDragReducer.js')
const LanguageReducer = require('./reducers/LanguageReducer.js')
const IncidentDragStateReducer = require('./reducers/IncidentDragStateReducer.js')
const FilterboxActivationStateReducer = require('./reducers/FilterboxActivationStateReducer.js')
const HistoryReducer = require('./reducers/HistoryReducer.js')
const CategoryDragReducer = require('./reducers/CategoryDragReducer.js')
const IncidentListScrollPositionReducer = require('./reducers/IncidentListScrollPositionReducer.js')
const SelectedIncidentReducer = require('SelectedIncidentReducer.js')

const RouterMiddleware = require('./RouterMiddleware.js')

const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  columns: ColumnsReducer,
  data: DataReducer,
  categories: CategoriesReducer,
  showEmptyCategories: EmptyCategoriesReducer,
  selectedIncident: IncidentSelectionStateReducer,
  pinnedIncidents: PinnedIncidentReducer,
  categoryHoverState: CategoryHoverStateReducer,
  sidebarColumnHover: SidebarColumnHoverReducer,
  columnDragStatus: ColumnDragReducer,
  sidebarDragStatus: SidebarColumnDragReducer,
  language: LanguageReducer,
  incidentDragState: IncidentDragStateReducer,
  filterboxActivationState: FilterboxActivationStateReducer,
  categoryDragStatus: CategoryDragReducer,
  history: HistoryReducer,
  incidentListScrollPosition: IncidentListScrollPositionReducer,
  selectedIncidents: SelectedIncidentReducer,
})

module.exports = function () {
  return Redux.createStore(reducers, Redux.applyMiddleware(RouterMiddleware))
}


