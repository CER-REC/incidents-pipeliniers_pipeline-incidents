require('babel-polyfill')

const ReactDOM = require('react-dom')
const DomReady = require('domready')
const ReactRedux = require('react-redux')
const React = require('react')

const Constants = require('./Constants.js')
const Root = require('./components/Root.jsx')
const Resized = require('./actionCreators/ResizeScreenCreator.js')
const Store = require('./Store.js')
const DataLoader = require('./DataLoader.js')
const RouteComputations = require('./RouteComputations.js')
const SetFromRouterStateCreator = require('./actionCreators/SetFromRouterStateCreator.js')


const store = Store()

// Uncomment for debugging only.
window.store = store


// TODO: is this the best place for this?
DataLoader.loadDataCsv(store)

DomReady( () => {

  store.getState().history.listen(locationChangeHandler)

  resizeScreenHandler()
  window.addEventListener('resize', resizeScreenHandler)

  const app = <ReactRedux.Provider store={store}>
    <Root />
  </ReactRedux.Provider>

  ReactDOM.render(app, document.getElementById('reactRoot'))
})

function resizeScreenHandler () {
  // Ensures the width and height of the workspace keep the ratio 900:600
  const w = document.getElementById('reactRoot').clientWidth
  let h

  if (store.getState().screenshotMode) {
    h = Constants.get('screenshotHeight')
  }
  else {
    h = w * Constants.getIn(['workspace', 'heightToWidthRatio'])
  }

  store.dispatch(Resized(w,h))
}


function locationChangeHandler (location, action) {

  // We are only interested in browser backward/forward button clicks, and not
  // state changes we create ourselves (i.e. only popstate events)
  if (action !== 'POP') {
    return
  }

  const state = store.getState()

  const routerState = RouteComputations.urlParamsToState(location.search, state.data, state.categories)

  store.dispatch(SetFromRouterStateCreator({
    columns: routerState.columns,
    categories: routerState.categories,
    showEmptyCategories: routerState.showEmptyCategories,
    pinnedIncidents: routerState.pinnedIncidents,
    selectedIncident: routerState.selectedIncident,
    language: routerState.language,
  }))


}

