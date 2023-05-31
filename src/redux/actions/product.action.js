import * as actionType from "../constants/productConstant";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  const API_GetProducts = `${process.env.REACT_APP_BASE_URL}/api/product/get_products.php`;

  try {
    dispatch({ type: actionType.GET_PRODUCTS_REQUEST, payload: [] });
    const { data } = await axios.get(API_GetProducts);
    dispatch({
      type: actionType.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductsDetails = () => async (dispatch) => {
  const API_GetProductsAttributes = `${process.env.REACT_APP_BASE_URL}/api/attribute/read_products_attributes.php`;

  try {
    dispatch({ type: actionType.GET_PRODUCT_ATTRIBUTE_REQUEST, payload: [] });

    const { data } = await axios.get(API_GetProductsAttributes);

    dispatch({
      type: actionType.GET_PRODUCT_ATTRIBUTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_ATTRIBUTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
