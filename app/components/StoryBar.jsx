
const React = require('react')
const ReactRedux = require('react-redux')

require('./StoryBar.scss')

const Constants = require('../Constants.js')
const StoryRow = require('./StoryRow.jsx')

class StoryBar extends React.Component {
  render() {
    return <div>
      <div id='headingMargin'/>
      <div id='heading'>
        <span 
          className='storiesHeading'>
          STORIES ABOUT PIPELINE INCIDENTS
        </span>
      </div>
      <StoryRow/>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(StoryBar)