
const React = require('react')
const ReactRedux = require('react-redux')

require('./StoryRow.scss')

const Constants = require('../Constants.js')
const Story = require('./Story.jsx')

class StoryRow extends React.Component {
  render() {
    return <g><div>
      <Story 
        id={Constants.getIn(['stories', this.props.rowName, 'leftStory'])} 
        position='leftStoryRowOne'/>
      <Story 
        id={Constants.getIn(['stories', this.props.rowName, 'middleStory'])} 
        position='middleStoryRowOne'/>
      <Story 
        id={Constants.getIn(['stories', this.props.rowName, 'rightStory'])}
        position='rightStoryRowOne'/>
    </div>
    </g>
  }
}

const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(StoryRow)