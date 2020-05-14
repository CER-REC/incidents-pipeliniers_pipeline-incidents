
import React from 'react'
import * as ReactRedux from 'react-redux'

import './StoryRow.scss'

import Constants from '../Constants.js'
import Story from './Story.jsx'

class StoryRow extends React.Component {

  leftStory() {
    if (Constants.getIn(['stories', this.props.rowName, 'leftStory']) === undefined) {
      return null
    }

    return <Story 
      id={Constants.getIn(['stories', this.props.rowName, 'leftStory'])} 
      position='leftStory'/>
  }

  middleStory() {
    if (Constants.getIn(['stories', this.props.rowName, 'middleStory']) === undefined) {
      return null
    }

    return <Story 
      id={Constants.getIn(['stories', this.props.rowName, 'middleStory'])} 
      position='middleStory'/>

  }

  rightStory() {
    if (Constants.getIn(['stories', this.props.rowName, 'rightStory']) === undefined) {
      return null
    }

    return <Story 
      id={Constants.getIn(['stories', this.props.rowName, 'rightStory'])} 
      position='rightStory'/>

  }




  render() {
    return <div>
      {this.leftStory()}
      {this.middleStory()}
      {this.rightStory()}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
  }
}

export default ReactRedux.connect(mapStateToProps)(StoryRow)