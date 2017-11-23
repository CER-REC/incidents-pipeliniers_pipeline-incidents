
const React = require('react')
const ReactRedux = require('react-redux')

require('./StoryRow.scss')

const Constants = require('../Constants.js')
const Story = require('./Story.jsx')

class StoryRow extends React.Component {

  render() {
    if(Constants.getIn(['stories', this.props.rowName, 'middleStory']) === undefined) {
      return <Story 
        id={Constants.getIn(['stories', this.props.rowName, 'leftStory'])} 
        position='leftStory'/>
    } else if(Constants.getIn(['stories', this.props.rowName, 'rightStory']) === undefined) {
      return <div>
        <div>
          <Story 
            id={Constants.getIn(['stories', this.props.rowName, 'leftStory'])} 
            position='leftStory'/>
        </div>

        <div>
          <Story 
            id={Constants.getIn(['stories', this.props.rowName, 'middleStory'])} 
            position='middleStory'/>
        </div>
      </div>

    }
    return <div> 
      <div>
        <Story 
          id={Constants.getIn(['stories', this.props.rowName, 'leftStory'])} 
          position='leftStory'/>
      </div>

      <div>
        <Story 
          id={Constants.getIn(['stories', this.props.rowName, 'middleStory'])} 
          position='middleStory'/>
      </div>
      
      <div>
        <Story 
          id={Constants.getIn(['stories', this.props.rowName, 'rightStory'])}
          position='rightStory'/>
      </div>
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