
// State: one of 'en' or 'fr'
const LanguageReducer = (state = 'en', action) => {
  switch (action.type) {

  case 'SetLanguage': 
    return action.language

  default:
    return state
  }
}

module.exports = LanguageReducer