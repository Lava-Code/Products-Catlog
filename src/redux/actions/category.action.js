//import { Dispatch } from "react";
import * as actionType from "../constants/categoryConstant";
import axios from "axios";

export const getCategory = () => async (dispatch) => {
  const API_GetCategory = `${process.env.REACT_APP_BASE_URL}/api/category/get_category.php`;
  try {
    dispatch({ type: actionType.GET_CATEGORY_REQUEST });

    const { data } = await axios.get(API_GetCategory);
    dispatch({
      type: actionType.GET_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
