import React from 'react'
import * as ReactHotLoaderRoot from 'react-hot-loader/root'

import Workspace from './Workspace'

import '../styles/Fonts.scss'
import '../styles/Common.scss'
import '../styles/QuestionMarkIcon.scss'

class Root extends React.Component {
  render() {
    return <div>
      <Workspace/>
    </div>

  }
}

export default ReactHotLoaderRoot.hot(Root)
