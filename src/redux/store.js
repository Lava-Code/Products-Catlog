import composedEnhancers from "../middleware";
import routeReducer from "./reducers";
import { legacy_createStore as createStore } from "redux";

const store = createStore(routeReducer, composedEnhancers);

export default store;
