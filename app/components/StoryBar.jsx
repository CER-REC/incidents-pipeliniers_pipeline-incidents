
import React from 'react'
import * as ReactRedux from 'react-redux'

import './StoryBar.scss'

import Constants from '../Constants.js'
import Tr from '../TranslationTable.js'
import StoryRow from './StoryRow.jsx'

class StoryBar extends React.Component {
  render() {
    return <div
      id={Constants.get('storyBarID')}>
      <div id='headingMargin'/>
      <div id='heading'>
        <span 
          className='storiesHeading'>
          {Tr.getIn(['storiesBarHeading', this.props.language])}
        </span>
      </div>

      <StoryRow rowName='firstRow'/> 
    </div>
    
  }
}

const mapStateToProps = state => {
  return {
    language: state.language,
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
  }
}

export default ReactRedux.connect(mapStateToProps)(StoryBar)