const React = require('react')
const ReactRedux = require('react-redux')

const Column = require('./Column.jsx')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const Constants = require('../Constants.js')

require('./Sidebar.scss')

class Sidebar extends React.Component {

  // TODO: we should think about sidebar rendering in two special cases:
  // - when the sidebar is empty, do we show something to indicate where it is?
  // - when the user is dragging a column around, should we show something on
  //   the sidebar to indicate that it is a drop target?

  columns() {
    const measurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .get('sideBar')

    const numberOfColumnsInSidebar = WorkspaceComputations.numberOfColumnsInSidebar(this.props.columns)

    // Don't render any columns if the sidebar is empty.
    if(numberOfColumnsInSidebar < 1) return null

    let index = 0
    return Constants.get('columnNames').map((columnName) => {
      if(this.props.columns.indexOf(columnName) < 0) {
        index += 1
        const columnHeight = measurements.get('height') - 
                             ((index-1)*Constants.getIn(['sidebar', 'labelHeight'])) - 
                             (numberOfColumnsInSidebar - index) * 
                             Constants.getIn(['sidebar', 'verticalStackingOffset'])
        let columnX = ((index-1) * 
                        Constants.getIn(['sidebar', 'horizontalStackingOffset'])) + 
                        measurements.get('x')

        // Handle sidebar column hover by offseting its position
        // by the sidebar column hover offset.
        if(this.props.sidebarColumnHover === columnName) {
          let sidebarHoverAnalyticsAction = `${columnName + ' ' + 'column hovered'}`
          this.props.analytics.reportEvent(`${Constants.getIn(['analyticsCategory','sidebar'])}`, sidebarHoverAnalyticsAction)
          columnX += Constants.getIn(['sidebar', 'columnHoverOffset'])
        }
        const columnY = ((index-1) * 
                        Constants.getIn(['sidebar', 'labelHeight'])) + 
                        measurements.get('y') 

        return <Column 
          columnName={columnName} 
          key={columnName} 
          columnType = { Constants.getIn(['columnTypes', 'SIDEBAR']) }
          columnWidth={Constants.getIn(['sidebar', 'columnWidth'])}
          columnHeight={columnHeight}
          columnX={columnX}
          columnY={columnY}/>
      }
    }).toArray()
  }

  render() {
    return <g> 
      {this.columns()}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
    sidebarColumnHover: state.sidebarColumnHover,
    analytics: state.analytics,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Sidebar)