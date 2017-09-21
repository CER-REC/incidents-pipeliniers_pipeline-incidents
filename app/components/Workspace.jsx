
const React = require('react')
const ReactRedux = require('react-redux')
const Header = require('./header.jsx')
const EmptyCategories = require('./EmptyCategories.jsx')
const SocialBar = require('./SocialBar.jsx')

require('./Workspace.scss')

const IncidentBar = require('./IncidentBar.jsx')
const Column = require('./Column.jsx')
const MapColumn = require('./MapColumn.jsx')
const SideBar = require('./SideBar.jsx')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const MapContainer = require('./MapContainer.jsx')
const Constants = require('../Constants.js')


class Workspace extends React.Component {


  columns() {
    return this.props.columns.map( (columnName) => {
      if (columnName === 'map') {
        return <MapColumn key={columnName}/>
      }
      else {
        return <Column
          columnName={columnName}
          key={columnName}
          columnType = { Constants.getIn(['columnTypes', 'WORKSPACE']) }
        />
      }
    }).toArray()
  }

  mapContainer() {
    if (WorkspaceComputations.mapDisplayed(this.props.columns)) {
      return <MapContainer/>
    }
    else {
      return null
    }
  }

  emptyCategories() {
    if (!this.props.screenshotMode) {
      return <EmptyCategories />
    }
    else {
      return null
    }
  }

  socialbar() {
    if (!this.props.screenshotMode) {
      return <SocialBar/>
    }
    else {
      return null
    }
  }

  workspaceClass() {
    if (!this.props.screenshotMode) {
      return 'workspace'
    }
    else {
      return 'screenshotWorkspace'
    }
  }

  render() {

    // Many of the downstream computations require that the data be loaded
    // Bail out here if it isn't
    // TODO: show a loading screen of some sort?
    if (this.props.data.count() === 0 || this.props.categories.count() === 0) {
      return <div/>
    }

    const horizontalPositions = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)


    return <div>
      <div className = { this.workspaceClass() } >
        { this.mapContainer() }
        <svg 
          className = 'workspaceSvg'
          width = { horizontalPositions.getIn(['workspace', 'width']) }
          height = { horizontalPositions.getIn(['workspace', 'height']) }
        >
          <Header />
          { this.emptyCategories() }
          <IncidentBar/>
          <SideBar/>
          { this.columns() }
          { this.socialbar() }
        </svg>
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
    screenshotMode: state.screenshotMode,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Workspace)