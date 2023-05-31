import * as actionType from "../constants/unitsConstant";

export const getUnits = (state = { units: [] }, action) => {
  switch (action.type) {
    case actionType.GET_UNITS_REQUEST:
      return {
        units: [],
      };

    case actionType.GET_UNITS_SUCCESS:
      return {
        units: action.payload,
      };

    case actionType.GET_UNITS_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};
