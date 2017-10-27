
const React = require('react')
const ReactRedux = require('react-redux')

require('./StoryRow.scss')

const Constants = require('../Constants.js')
const Story = require('./Story.jsx')

class StoryRow extends React.Component {
  render() {
    return <div>
      <Story 
        id={Constants.getIn(['stories', this.props.rowName, 'leftStory'])} 
        position='leftStory'
        className = 'story'
      />
      <Story 
        id={Constants.getIn(['stories', this.props.rowName, 'middleStory'])} 
        position='middleStory'
        className = 'story'
      />
      <Story 
        id={Constants.getIn(['stories', this.props.rowName, 'rightStory'])}
        position='rightStory'
        className = 'story'
      />
    </div>
  }
}

const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(StoryRow)