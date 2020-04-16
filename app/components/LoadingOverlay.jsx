
const React = require('react')
const ReactRedux = require('react-redux')
const Tr = require('../TranslationTable.js')
require('./LoadingOverlay.scss')

class LoadingOverlay extends React.Component {
  render() {
    const title = Tr.getIn(['loadingOverlayTitle', this.props.language])
    return (
      <div className="workspace-overlay-loading-spinner-bg">
        <div className="workspace-overlay-loading-spinner-container">
          <div>
            <svg viewBox="22 22 44 44">
              <circle
                className="workspace-overlay-loading-spinner"
                cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6"
              />
            </svg>
          </div>
          <p>{title && title.toUpperCase()}</p>
        </div>
      </div>
    )
  }
}

module.exports = ReactRedux.connect(state => ({ language: state.language }))(LoadingOverlay)
