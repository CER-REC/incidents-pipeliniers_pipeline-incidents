
import * as Redux from 'redux'

import ViewportReducer from './reducers/ViewportReducer.js'
import ColumnsReducer from './reducers/ColumnsReducer.js'
import DataReducer from './reducers/DataReducer.js'
import IDMapReducer from './reducers/IDMapReducer.js'
import CategoriesReducer from './reducers/CategoriesReducer.js'
import EmptyCategoriesReducer from './reducers/EmptyCategoriesReducer.js'
import PinnedIncidentReducer from './reducers/PinnedIncidentReducer.js'
import CategoryHoverStateReducer from './reducers/CategoryHoverStateReducer.js'
import SidebarColumnHoverReducer from './reducers/SidebarColumnHoverReducer.js'
import ColumnDragReducer from './reducers/ColumnDragReducer.js'
import SidebarColumnDragReducer from './reducers/SidebarColumnDragReducer.js'
import LanguageReducer from './reducers/LanguageReducer.js'
import FilterboxActivationStateReducer from './reducers/FilterboxActivationStateReducer.js'
import HistoryReducer from './reducers/HistoryReducer.js'
import CategoryDragReducer from './reducers/CategoryDragReducer.js'
import SchemaReducer from './reducers/SchemaReducer.js'
import IncidentListScrollPositionReducer from './reducers/IncidentListScrollPositionReducer.js'
import SelectedIncidentsReducer from './reducers/SelectedIncidentsReducer.js'
import HoveredIncidentReducer from './reducers/HoveredIncidentReducer.js'
import ShowIncidentListReducer from './reducers/ShowIncidentListReducer.js'
import StoryReducer from './reducers/StoryReducer.js'
import DisclaimerReducer from './reducers/DisclaimerReducer.js'
import StoryImageReducer from './reducers/StoryImageReducer.js'
import AboutReducer from './reducers/AboutReducer.js'
import ColumnTooltipReducer from './reducers/ColumnTooltipReducer.js'
import ColumnTooltipDetailClickReducer from './reducers/ColumnTooltipDetailClickReducer.js'
import AnalyticsReducer from './reducers/AnalyticsReducer.js'
import PopoverReducer from './reducers/PopoverReducer.js'
import LastUpdateReducer from './reducers/LastUpdateReducer.js'


import RouterMiddleware from './RouterMiddleware.js'

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

export default function () {
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
