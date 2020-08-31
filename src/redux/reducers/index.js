import { combineReducers } from "redux";
import db from "./dbReducer";
import table from "./tableReducer";
import error from "./errorReducer";
import loader from "./loadingReducer";

const rootReducer = combineReducers({
  db,
  table,
  error,
  loader,
});

export default rootReducer;
