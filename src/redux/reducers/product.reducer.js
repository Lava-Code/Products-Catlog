import * as actionType from "../constants/productConstant";

export const getProductsHeaders = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: action.payload,
      };

    case actionType.GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case actionType.GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getProductsAttribute = (state = { attributes: [] }, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCT_ATTRIBUTE_REQUEST:
      return {
        attributes: action.payload,
      };

    case actionType.GET_PRODUCT_ATTRIBUTE_SUCCESS:
      return {
        attributes: action.payload,
      };

    case actionType.GET_PRODUCT_ATTRIBUTE_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};
