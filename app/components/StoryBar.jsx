
const React = require('react')
const ReactRedux = require('react-redux')

require('./StoryBar.scss')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const StoryRow = require('./StoryRow.jsx')

class StoryBar extends React.Component {
  render() {
    return <div>
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

module.exports = ReactRedux.connect(mapStateToProps)(StoryBar)