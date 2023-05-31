//import { Dispatch } from "react";
import axios from "axios";
import * as actionType from "../constants/unitsConstant";

export const getUnits = () => async (dispatch) => {
  const API_GetMeasure = `${process.env.REACT_APP_BASE_URL}/api/measuring/get_measure.php`;
  try {
    dispatch({ type: actionType.GET_UNITS_REQUEST });

    const data = await axios.get(API_GetMeasure);

    dispatch({
      type: actionType.GET_UNITS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_UNITS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
