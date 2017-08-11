const React = require('react')
const ReactRedux = require('react-redux')

// const WorkspaceComputations = require('../WorkspaceComputations.js')

class MapColumn extends React.Component {

  render() {
    return <div>
      
      <canvas/>

    </div>
  }
}




const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(MapColumn)