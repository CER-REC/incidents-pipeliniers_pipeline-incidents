function SetInitialCategoryStateCreator (categories) {

  return {
    type: 'SetInitialCategoryState',
    categories: categories,
  }

}

export default SetInitialCategoryStateCreator
