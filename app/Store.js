
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer.js')
const ColumnsReducer = require('./reducers/ColumnsReducer.js')
const DataReducer = require('./reducers/DataReducer.js')
const IDMapReducer = require('./reducers/IDMapReducer.js')
const CategoriesReducer = require('./reducers/CategoriesReducer.js')
const EmptyCategoriesReducer = require('./reducers/EmptyCategoriesReducer.js')
const PinnedIncidentReducer = require('./reducers/PinnedIncidentReducer.js')
const CategoryHoverStateReducer = require('./reducers/CategoryHoverStateReducer.js')
const SidebarColumnHoverReducer = require('./reducers/SidebarColumnHoverReducer.js')
const ColumnDragReducer = require('./reducers/ColumnDragReducer.js')
const SidebarColumnDragReducer = require('./reducers/SidebarColumnDragReducer.js')
const LanguageReducer = require('./reducers/LanguageReducer.js')
const FilterboxActivationStateReducer = require('./reducers/FilterboxActivationStateReducer.js')
const HistoryReducer = require('./reducers/HistoryReducer.js')
const CategoryDragReducer = require('./reducers/CategoryDragReducer.js')
const ScreenshotModeReducer = require('./reducers/ScreenshotModeReducer.js')
const SchemaReducer = require('./reducers/SchemaReducer.js')
const IncidentListScrollPositionReducer = require('./reducers/IncidentListScrollPositionReducer.js')
const SelectedIncidentsReducer = require('./reducers/SelectedIncidentsReducer.js')
const HoveredIncidentReducer = require('./reducers/HoveredIncidentReducer.js')
const ShowIncidentListReducer = require('./reducers/ShowIncidentListReducer.js')
const StoryReducer = require('./reducers/StoryReducer.js')
const DisclaimerReducer = require('./reducers/DisclaimerReducer.js')
const StoryImageReducer = require('./reducers/StoryImageReducer.js')
const AboutReducer = require('./reducers/AboutReducer.js')
const ColumnTooltipReducer = require('./reducers/ColumnTooltipReducer.js')
const ColumnTooltipDetailClickReducer = require('./reducers/ColumnTooltipDetailClickReducer.js')
const AnalyticsReducer = require('./reducers/AnalyticsReducer.js')
const PopoverReducer = require('./reducers/PopoverReducer.js')
const LastUpdateReducer = require('./reducers/LastUpdateReducer.js')


const RouterMiddleware = require('./RouterMiddleware.js')

const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  columns: ColumnsReducer,
  data: DataReducer,
  idMap: IDMapReducer,
  categories: CategoriesReducer,
  showEmptyCategories: EmptyCategoriesReducer,
  pinnedIncidents: PinnedIncidentReducer,
  categoryHoverState: CategoryHoverStateReducer,
  sidebarColumnHover: SidebarColumnHoverReducer,
  columnDragStatus: ColumnDragReducer,
  sidebarDragStatus: SidebarColumnDragReducer,
  language: LanguageReducer,
  filterboxActivationState: FilterboxActivationStateReducer,
  categoryDragStatus: CategoryDragReducer,
  history: HistoryReducer,
  screenshotMode: ScreenshotModeReducer,
  schema: SchemaReducer,
  incidentListScrollPosition: IncidentListScrollPositionReducer,
  selectedIncidents: SelectedIncidentsReducer,
  hoveredIncident: HoveredIncidentReducer,
  showIncidentList: ShowIncidentListReducer,
  story: StoryReducer,
  disclaimer: DisclaimerReducer,
  columnTooltip: ColumnTooltipReducer,
  columnTooltipClick: ColumnTooltipDetailClickReducer,
  storyImage: StoryImageReducer,
  about: AboutReducer,
  analytics: AnalyticsReducer,
  popoverReducer: PopoverReducer,
  lastUpdate: LastUpdateReducer,
})

module.exports = function () {
  // Enable Redux Dev Tools if they are installed in the browser
  // Also handle the case where the Store is used as an offline script, in
  // data.js
  
  let composeEnhancers = Redux.compose
  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== undefined) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
  return Redux.createStore(
    reducers,
    composeEnhancers(Redux.applyMiddleware(RouterMiddleware))
  )
}


