import { combineReducers } from "redux";
import connections from "./connectionReducer";
import keyspaces from "./keyspaceReducer";
import tables from "./tableReducer";
import tableinfo from "./tableMetaDataReducer";

const rootReducer = combineReducers({
  connections,
  keyspaces,
  tables,
  tableinfo,
});

export default rootReducer;
