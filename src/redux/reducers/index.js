import { combineReducers } from "redux";
import connections from "./connectionReducer";
import keyspaces from "./keyspaceReducer";
import tables from "./tableReducer";
import tableinfo from "./tableMetaDataReducer";
import tablerows from "./tableRowsReducer";

const rootReducer = combineReducers({
  connections,
  keyspaces,
  tables,
  tableinfo,
  tablerows,
});

export default rootReducer;
