const React = require('react')
const ReactRedux = require('react-redux')

const Column = require('./Column.jsx')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const Constants = require('../Constants.js')

require('./Sidebar.scss')

const COLUMN_TYPE = {
  SIDEBAR: 'SIDEBAR',
  WORKSPACE: 'WORKSPACE'
}

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

    const columnsInSidebar = WorkspaceComputations.columnsInSidebar(this.props.columns)
    const columnWidth = measurements.get('width') - 
                        ((columnsInSidebar - 1) * 
                        Constants.getIn(['sidebar', 'horizontalStackingOffset']))

    let index = 0
    return Constants.get('columnNames').map((columnName) => {
      if(this.props.columns.indexOf(columnName) < 0) {
        index += 1
        const columnHeight = measurements.get('height') - 
                             ((index-1)*Constants.getIn(['sidebar', 'labelHeight'])) - 
                             (columnsInSidebar - index) * 
                             Constants.getIn(['sidebar', 'verticalStackingOffset'])
        const columnX = ((index-1) * 
                        Constants.getIn(['sidebar', 'horizontalStackingOffset'])) + 
                        measurements.get('x')
        const columnY = ((index-1) * 
                        Constants.getIn(['sidebar', 'labelHeight'])) + 
                        measurements.get('y')
        return <Column 
          columnName={columnName} 
          key={columnName} 
          columnType={COLUMN_TYPE.SIDEBAR}
          columnWidth={columnWidth}
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
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Sidebar)