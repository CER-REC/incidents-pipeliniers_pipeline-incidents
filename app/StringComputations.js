const Constants = require('./Constants.js')
const WorkspaceComputations = require('./WorkspaceComputations.js')

const StringComputations = {

  // A function to split a string on ' ' and '-', but unlike string.split, it
  // retains the separators. E.g.:
  // 'foo' -> ['foo']
  // 'foo bar-baz' -> ['foo ', 'bar-', 'baz']
  splitWithSeparators(inputString) {
    const pieces = []
    while (true) {

      const spaceIndex = inputString.indexOf(' ')
      const dashIndex = inputString.indexOf('-')
      let splitIndex
      if (spaceIndex >= 0 && dashIndex >= 0) {
        // If we found both separators, use the one closest to the start of the
        // string
        splitIndex = Math.min(spaceIndex, dashIndex)
      }
      else {
        // If we found one separator, we want the index that is not -1
        // If we found neither separator, both indexes are -1
        splitIndex = Math.max(spaceIndex, dashIndex)
      }


      if (splitIndex >= 0) {
        // We found a piece. Add it to the pieces and loop again to check for
        // more.
        pieces.push(inputString.substring(0, splitIndex + 1))
        inputString = inputString.substring(splitIndex + 1)
      }
      else {
        // No more separated pieces, add what's left and return.
        pieces.push(inputString)
        return pieces
      }

    }

  },

  splitHeading(label, charLimit = Constants.get('categoryLabelLineLength')) {

    // Split the label at every space and dash
    const splitPieces = StringComputations.splitWithSeparators(label)

    // Iteratively build up label fragments, up to the label line limit
    const labelFragments = []
    let currentFragment = ''

    for (const piece of splitPieces) {

      if (currentFragment.length + piece.length <= charLimit) {
        // There's enough space in the current fragment for this piece.
        currentFragment += piece
      }
      else {
        // Not enough space, finish this fragment and start another.
        if (currentFragment.length > 0) {
          labelFragments.push(currentFragment)
        }
        currentFragment = piece
      }

    }

    // If there's anything leftover once we're done, add that to the label
    // fragments.
    if (currentFragment.length > 0) {
      labelFragments.push(currentFragment)
    }

    return labelFragments

  },

  incidentsLabelLanguage(language) {
    const y = WorkspaceComputations.topBarHeight()
    if(language === 'fr') {
      return y
    }
    else {
      return y + Constants.get('columnHeadingLineOffset')
    }
  }

}


module.exports = StringComputations