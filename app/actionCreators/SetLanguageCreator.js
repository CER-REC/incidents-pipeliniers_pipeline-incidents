
function SetLanguageCreator (language) {
  return {
    type: 'SetLanguage',
    language: language,
  }
}

module.exports = SetLanguageCreator