const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')

require('./MapContainer.scss')

class MapContainer extends React.Component {

  mapContainerStyle() {

    const mapPositions = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', 'map'])


    return {

      width: `${mapPositions.get('width')}px`,
      height: `${mapPositions.get('height')}px`,
      left: `${mapPositions.get('x')}px`,
      top: `${mapPositions.get('y')}px`,
      backgroundColor: 'azure' ,

    }
  }


  render() {



    return <div className='mapContainer'
    >

      <div className='innerContainer'
        style = { this.mapContainerStyle() }
      >
        
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
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(MapContainer)