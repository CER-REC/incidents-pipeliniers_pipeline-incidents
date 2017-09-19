const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const IncidentComputations = require('../IncidentComputations.js')

require('./IncidentList.scss')

class IncidentList extends React.Component {

  innerContainerStyle() {
    // TODO: if the scrolling list replaces the pin column permanently, we
    // should rename this chunk of the horizontal positions ... 
    const pinColumnPositions = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories, 
      this.props.viewport, 
      this.props.data, 
      this.props.columns, 
      this.props.categories
    ).get('pinColumn')

    return {
      width: `${Constants.getIn(['pinColumn', 'width'])}px`,
      height: `${pinColumnPositions.get('height')}px`,
      left: `${pinColumnPositions.get('x')}px`,
      top: `${pinColumnPositions.get('y')}px`,
    }
  }

  scrollPaneStyle() {

    // TODO: if the scrolling list replaces the pin column permanently, we
    // should rename this chunk of the horizontal positions ... 
    const pinColumnPositions = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories, 
      this.props.viewport, 
      this.props.data, 
      this.props.columns, 
      this.props.categories
    ).get('pinColumn')

    return {
      maxHeight: `${pinColumnPositions.get('height')}px`,
    }

  }


  render() {




    return <div className = 'incidentListOuterContainer'>
      <div 
        className = 'incidentListInnerContainer' 
        style = { this.innerContainerStyle() }
      >

        <div 
          className = 'incidentListScrollPane'
          style = { this.scrollPaneStyle() }
        >
          
        </div>
       

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
    filterboxActivationState: state.filterboxActivationState,
    language: state.language,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(IncidentList)