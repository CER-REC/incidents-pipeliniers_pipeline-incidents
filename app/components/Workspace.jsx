
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

class Workspace extends React.Component {


  columns() {
    return this.props.columns.map( (columnName, i) => {
      if (columnName === 'map') {
        return <MapColumn key={columnName} index={i} />
      }
      else {
        return <Column columnName={columnName} key={columnName} index={i} />
      }
    }).toArray()
  }

  render() {

    // Many of the downstream computations require that the data be loaded
    // Bail out here if it isn't
    // TODO: show a loading screen of some sort?
    if (this.props.data.count() === 0 || this.props.categories.count() === 0) {
      return <svg/>
    }

    return  <svg className="Workspace" width={this.props.viewport.get('x')}
      height={this.props.viewport.get('y')}>
      <Header />

      <EmptyCategories />
      <IncidentBar/>
      {this.columns()}
      <SideBar/>
      <SocialBar/>

    </svg>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
    data: state.data,
    categories: state.categories,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Workspace)