const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')

require('./SocialBar.scss')

class SocialBar extends React.Component {

  render() {

    // TODO: an issue with the social bar: it is intended to 'float along' to 
    // the left of the SVG content.
    // Doing this inside the SVG itself would be really, really hard. We may
    // just end up placing a second svg adjacent to the first, in a container
    // floated left ... 


    const x = WorkspaceComputations.workspaceWidth(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      - Constants.getIn(['socialBar', 'width'])

    return <g>
      <rect
        x={ x }
        y={ WorkspaceComputations.topBarHeight() }
        width={ Constants.getIn(['socialBar', 'width']) }
        height={ Constants.getIn(['socialBar', 'height']) }
        fill='#FFDDDD'
      />
    </g>
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

module.exports = ReactRedux.connect(mapStateToProps)(SocialBar)
