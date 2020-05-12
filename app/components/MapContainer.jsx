import React from 'react'
import * as ReactRedux from 'react-redux'

import WorkspaceComputations from '../WorkspaceComputations.js'
import MapComponent from './Map.jsx'

import './MapContainer.scss'

class MapContainer extends React.Component {

  mapContainerStyle() {
    const mapPositions = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', 'map'])

    // Compute the left offset and opacity if the 
    // map is being dragged.
    let leftX = mapPositions.get('x')
    let opacity = 1
    if(this.props.columnDragStatus.get('isStarted') &&
       this.props.columnDragStatus.get('columnName') === 'map') {
      leftX = this.props.columnDragStatus.get('newX') - 
              this.props.columnDragStatus.get('offset') - 
              mapPositions.get('width')/2
      opacity = 0.6
    }


    return {
      width: `${mapPositions.get('width')}px`,
      height: `${mapPositions.get('height')}px`,
      left: `${leftX}px`,
      top: `${mapPositions.get('y')}px`,
      opacity: opacity,
    }

  }

  render() {
    let className = 'mapContainer'
    if (this.props.columnDragStatus.get('isStarted') === true &&
      this.props.columnDragStatus.get('columnName') === 'map') {
      className += ' dragged'
    }

    return <div 
      className = { className }>
      <div 
        className = 'innerContainer'
        style = { this.mapContainerStyle() }>
        <MapComponent />
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
    columnDragStatus: state.columnDragStatus,
  }
}

export default ReactRedux.connect(mapStateToProps)(MapContainer)