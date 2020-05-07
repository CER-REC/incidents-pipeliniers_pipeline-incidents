import ReactDOM from 'react-dom'
import DomReady from 'domready'
import * as ReactRedux from 'react-redux'
import React from 'react'
import * as ReactHotLoader from 'react-hot-loader'

import Constants from './Constants.js'
import Root from './components/Root.jsx'
import Resized from './actionCreators/ResizeScreenCreator.js'
import Store from './Store.js'
import DataLoader from './DataLoader.js'
import RouteComputations from './RouteComputations.js'
import SetFromRouterStateCreator from './actionCreators/SetFromRouterStateCreator.js'
import PopupDismissedCreator from './actionCreators/PopupDismissedCreator.js'
import SetUpAnalyticsCreator from './actionCreators/SetUpAnalyticsCreator.js'
import AnalyticsReporter from './AnalyticsReporter.js'
import SetupHistoryCreator from './actionCreators/SetupHistoryCreator.js'


const store = Store()
store.dispatch(SetupHistoryCreator())

if (process.env.NODE_ENV === 'development') {
  window.store = store
}


const dataLoadPromise = DataLoader.loadFromDataService(store, document.location);

function render(Component) {
  const app = (
    <ReactHotLoader.AppContainer>
      <ReactRedux.Provider store={store}>
        <Component />
      </ReactRedux.Provider>
    </ReactHotLoader.AppContainer>
  )

  ReactDOM.render(app, document.getElementById('reactRoot'))
}

DomReady( () => {
  store.dispatch(SetUpAnalyticsCreator(new AnalyticsReporter()))

  dataLoadPromise.then( () => {

    store.getState().history.listen(locationChangeHandler)

    resizeScreenHandler()
    window.addEventListener('resize', resizeScreenHandler)
    window.addEventListener('click', windowClickHandler)

    render(Root)
  }).catch( (error) => {
    // TODO: Render a nicer error message when the loading procedure fails
    console.error(error)
    ReactDOM.render(<div> <h1>An Error has Occurred | On a rencontré une erreur</h1> <p>Please try again later | Visiter une autre temps, s'il vous plaît.</p> </div>, document.getElementById('reactRoot'))
  })
})

function resizeScreenHandler () {
  // Ensures the width and height of the workspace keep the ratio 900:600
  const w = document.getElementById('reactRoot').clientWidth
  const h = w * Constants.getIn(['workspace', 'heightToWidthRatio'])

  store.dispatch(Resized(w,h))
}

// Handles closing any open tooltips.
function windowClickHandler () {
  store.dispatch(PopupDismissedCreator())
}

function locationChangeHandler (location, action) {

  // We are only interested in browser backward/forward button clicks, and not
  // state changes we create ourselves (i.e. only popstate events)
  if (action !== 'POP') {
    return
  }

  const state = store.getState()

  const routerState = RouteComputations.urlParamsToState(document.location, state.data, state.categories)

  store.dispatch(SetFromRouterStateCreator({
    columns: routerState.columns,
    categories: routerState.categories,
    showEmptyCategories: routerState.showEmptyCategories,
    pinnedIncidents: routerState.pinnedIncidents,
    language: routerState.language,
    selectedIncidents: routerState.selectedIncidents,
    filterboxActivationState: routerState.filterboxActivationState,
  }))

}

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Root.jsx', () => {
    render(Root)
  })
}
