const Immutable = require('immutable')

const TranslationTable = Immutable.fromJS({ 
  columnHeadings: {
    incidentTypes: {
      en:'INCIDENT TYPE',
      fr:'TODO',
    },
    reportedDate: {
      en:'REPORTED DATE/YEAR',
      fr:'TODO',
    },
    company: {
      en:'COMPANY',
      fr:'TODO',
    },
    status: {
      en:'STATUS',
      fr:'TODO',
    },
    province: {
      en:'PROVINCE',
      fr:'TODO',
    },
    substance: {
      en:'SUBSTANCE',
      fr:'TODO',
    },
    releaseType: {
      en:'RELEASE TYPE',
      fr:'TODO',
    },
    whatHappened: {
      en:'WHAT HAPPENED',
      fr:'TODO',
    },
    whyItHappened: {
      en:'WHY IT HAPPENED',
      fr:'TODO',
    },
    pipelinePhase: {
      en:'PIPELINE PHASE',
      fr:'TODO',
    },
    volumeCategory: {
      en:'APPROX VOL RELEASED',
      fr:'TODO',
    },
    substanceCategory: {
      en:'SUBSTANCE CATEGORY',
      fr:'TODO',
    },
    pipelineSystemComponentsInvolved: {
      en:'SYSTEM COMPONENTS INVOLVED',
      fr:'TODO',
    },
    map: {
      en:'MAP',
      fr:'TODO',
    }
  },
})

module.exports = TranslationTable