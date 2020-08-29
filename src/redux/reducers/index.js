import { combineReducers } from "redux";
import connections from "./connectionReducer";
import keyspaces from "./keyspaceReducer";
import tables from "./tableReducer";
import tableinfo from "./tableMetaDataReducer";
import tablerows from "./tableRowsReducer";
import error from "./errorReducer";
import loader from "./loadingReducer";

const rootReducer = combineReducers({
  connections,
  keyspaces,
  tables,
  tableinfo,
  tablerows,
  error,
  loader,
});

export default rootReducer;
