import React from 'react'

import IncidentList from './IncidentList.jsx'
import StarredIncidentList from './StarredIncidentList.jsx'
import IncidentListDivider from './IncidentListDivider.jsx'

import './IncidentContainer.scss'


class IncidentContainer extends React.Component {


  render() {
    return <div className = 'incidentContainer'>
      <IncidentList />
      <IncidentListDivider />
      <StarredIncidentList />
    </div>
  }


}


export default IncidentContainer