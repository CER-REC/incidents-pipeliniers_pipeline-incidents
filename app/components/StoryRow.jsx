
const React = require('react')
const ReactRedux = require('react-redux')

require('./StoryRow.scss')

const Constants = require('../Constants.js')
const Story = require('./Story.jsx')

class StoryRow extends React.Component {
  render() {
    return <div>
      <Story position='leftStory' rowName={this.props.rowName}/>
      <Story position='middleStory' rowName={this.props.rowName}/>
      <Story position='rightStory' rowName={this.props.rowName}/>
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