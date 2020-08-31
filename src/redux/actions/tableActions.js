import * as actionTypes from "./actionTypes";
import { toast } from "react-toastify";
const { ipcRenderer } = window.require("electron");

export function loadTableMetaData(keyspace, table) {
  return function (dispatch) {
    ipcRenderer.send("fetch:tableinfo", keyspace, table);
    ipcRenderer.once("tableinfo:fetched", (event, tableinfo) => {
      tableinfo = { ...tableinfo };
      tableinfo.keyspaceName = keyspace;
      dispatch({
        type: actionTypes.LOAD_TABLE_META_DATA,
        tableinfo,
      });
    });
  };
}

export function resetTableData() {
  return {
    type: actionTypes.RESET_TABLE_DATA,
  };
}

export function executeQuery(query, where) {
  return function (dispatch) {
    ipcRenderer.send("execute:query", query, where);
    ipcRenderer.once("query:executed", (event, rows) => {
      (!rows || rows.length === 0) &&
        toast.warn("No rows fetched!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      dispatch({
        type: actionTypes.FETCH_TABLE_ROWS,
        rows,
      });
    });
    ipcRenderer.once("query:execution:failed", (event, msg) => {
      toast.warn(msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };
}
export function clearTableRows(rows) {
  return {
    type: actionTypes.CLEAR_TABLE_ROWS,
  };
}
export function resetQueryForm() {
  return {
    type: actionTypes.RESET_QUERY_FORM,
  };
}
export function updateQueryForm(target, value) {
  return {
    type: actionTypes.UPDATE_QUERY_FORM,
  };
}
