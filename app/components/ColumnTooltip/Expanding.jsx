const React = require('react')

const ListTooltip = require('./List')

class ExpandingTooltip extends ListTooltip {
  getTooltipClass() {
    return 'ExpandingTooltip'
  }
}

module.exports = ExpandingTooltip
