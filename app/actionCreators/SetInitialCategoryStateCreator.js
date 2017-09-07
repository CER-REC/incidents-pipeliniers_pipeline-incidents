function SetInitialCategoryStateCreator (categories) {

  return {
    type: 'SetInitialCategoryState',
    categories: categories,
  }

}

module.exports = SetInitialCategoryStateCreator
