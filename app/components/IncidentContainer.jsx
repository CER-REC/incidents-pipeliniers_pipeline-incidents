const React = require('react')

const IncidentList = require('./IncidentList.jsx')
const StarredIncidentList = require('./StarredIncidentList.jsx')
const IncidentListDivider = require('./IncidentListDivider.jsx')

require('./IncidentContainer.scss')


class IncidentContainer extends React.Component {


  render() {
    return <div className = 'incidentContainer'>
      <IncidentList />
      <IncidentListDivider />
      <StarredIncidentList />
    </div>
  }


}


module.exports = IncidentContainer