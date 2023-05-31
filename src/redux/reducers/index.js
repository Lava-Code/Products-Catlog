import { combineReducers } from "redux";
import {
  getProductsHeaders,
  getProductsAttribute,
} from "../reducers/product.reducer";

import { getCategories } from "../reducers/category.reducer";
import { getUnits } from "../reducers/units.reducer";

const routeReducer = combineReducers({
  productsHeader: getProductsHeaders,
  productsAttribute: getProductsAttribute,
  category: getCategories,
  units: getUnits,
});

export default routeReducer;
