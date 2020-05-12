import MemoizeImmutable from 'memoize-immutable'

import CategoryComputations from './CategoryComputations.js'

import Constants from './Constants.js'

const FilterboxComputations = {

  showShowOnlyButton(data, columns, categories, columnName) {
    // If there is more than one visible category, we should show the 
    // 'show only' button. It's meaningless to have this button if there is 
    // already only one category ... 

    // categories: a map of {categoryName (string): visible (boolean)}
    const displayedCategories = CategoryComputations.displayedCategories(data, columns, categories, columnName)

    const visibleCategoriesCount = displayedCategories.reduce( (count, visible) => {
      if (visible === true) {
        return count + 1
      }
      else {
        return count
      }
    }, 0)

    return visibleCategoriesCount > 1
  },

  showHideButton(data, columns, categories, columnName) {
    // If there is more than one visible category, we should show the hide
    // button. We prevent the user from hiding the last shown category.

    // For now, since this is precisely the same logic as for the showOnly
    // button, we'll call that method here.
    return FilterboxComputations.showShowOnlyButton(data, columns, categories, columnName)
  },

  showResetButton(categories, columnName) {
    // If any of the categories are hidden, we should show the reset button

    // categories: a map of {categoryName (string): visible (boolean)}
    const columnCategories = categories.get(columnName)

    const hiddenCategory = columnCategories.find( visible => {
      return visible === false
    })

    // NB: when all categories are visible, the find call returns 'undefined'.
    // When we find a category that is not visible, the result of the find is
    // the value in the map, i.e.: false
    // So, when we have a category which is not on display (when hiddenCategory)
    // is false, we wish to return true.
    return hiddenCategory === false
  },

  buttonCount(data, columns, categories, columnName) {
    let count = 0
    if (FilterboxComputations.showShowOnlyButton(data, columns, categories, columnName)) {
      count += 1
    }
    if (FilterboxComputations.showHideButton(data, columns, categories, columnName)) {
      count += 1
    }
    if (FilterboxComputations.showResetButton(categories, columnName)) {
      count += 1
    }
    return count
  },

  boxWidth(language) {
    if(language === 'en') {
      return Constants.getIn(['filterbox', 'filterButtonWidth']) 
    }
    if(language === 'fr') {
      return Constants.getIn(['filterbox', 'filterButtonWidthFr'])
    }
  },

}




const MemoizedComputations = {}

for (const name of Object.keys(FilterboxComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(FilterboxComputations[name])
}

export default MemoizedComputations