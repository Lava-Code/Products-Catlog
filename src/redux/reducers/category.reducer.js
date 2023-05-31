import * as actionType from "../constants/categoryConstant";

export const getCategories = (state = { categories: [] }, action) => {
  switch (action.type) {
    case actionType.GET_CATEGORY_REQUEST:
      return {
        categories: [],
      };

    case actionType.GET_CATEGORY_SUCCESS:
      return {
        categories: action.payload,
      };

    default:
      return state;
  }
};
