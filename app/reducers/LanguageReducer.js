
// State: one of 'en' or 'fr'
const LanguageReducer = (state = 'en', action) => {
  switch (action.type) {

  case 'SetLanguage': 
    return action.language

  case 'SetFromRouterState':
    return action.language

  default:
    return state
  }
}

export default LanguageReducer