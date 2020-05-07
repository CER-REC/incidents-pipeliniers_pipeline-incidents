import Immutable from 'immutable'

const CategoryHoverStateReducer = (state = Immutable.Map({columnName: null, categoryName: null}), action) => {

  switch(action.type) {

  case 'CategoryHoverState':
    return Immutable.Map({columnName: action.columnName, categoryName: action.categoryName}) 
    

  case 'CategoryUnhoverState':
    return Immutable.Map({columnName: null, categoryName: null})

  default:
    return state
  }

}


export default CategoryHoverStateReducer