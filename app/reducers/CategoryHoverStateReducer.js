const Immutable = require('immutable')

const CategoryHoverStateReducer = (state = Immutable.Map({columnName: null, categoryName: null}), action) => {

  switch(action.type) {

  case 'CategoryHoverState':
   // console.log('reducer works')
    return Immutable.Map({columnName: action.columnName, categoryName: action.categoryName}) 
    

  case 'CategoryUnhoverState':
    return Immutable.Map({columnName: null, categoryName: null})

  default:
    return state
  }

}


module.exports = CategoryHoverStateReducer