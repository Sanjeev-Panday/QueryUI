import * as actionTypes from "./actionTypes";
import { toast } from "react-toastify";
const { ipcRenderer } = window.require("electron");

export function loadTableMetaData(keyspace, table) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SHOW_SPINNER,
    });
    ipcRenderer.send("fetch:tableinfo", keyspace, table);
    ipcRenderer.once("tableinfo:fetched", (event, tableinfo) => {
      tableinfo = { ...tableinfo };
      tableinfo.keyspaceName = keyspace;
      dispatch({
        type: actionTypes.LOAD_TABLE_META_DATA,
        tableinfo,
      });
      dispatch({
        type: actionTypes.HIDE_SPINNER,
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
    dispatch({
      type: actionTypes.SHOW_SPINNER,
    });
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
      dispatch({
        type: actionTypes.HIDE_SPINNER,
      });
    });
    ipcRenderer.once("query:execution:failed", (event, error) => {
      dispatch({
        type: actionTypes.SHOW_ERROR,
        error,
      });
      dispatch({
        type: actionTypes.HIDE_SPINNER,
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
export function showContextMenu(clickedRow, type) {
  return {
    type: actionTypes.SHOW_CONTEXT_MENU,
    clickedRow,
    menuType: type,
  };
}
export function copySelectedRow() {
  return function (dispatch, getState) {
    const { tablerows, clickedRow } = getState().table;
    ipcRenderer.send("copy:row", JSON.stringify(tablerows[clickedRow]));
    ipcRenderer.once("row:copied", () => {
      toast.success("Copied!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    });
  };
}
export function saveSelectedRow() {
  return function (dispatch, getState) {
    const { tablerows, clickedRow } = getState().table;
    ipcRenderer.send("save:row", JSON.stringify(tablerows[clickedRow]));
    ipcRenderer.once("row:saved", () => {
      toast.success("Saved Successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    });
  };
}
export function saveAllRows() {
  return function (dispatch, getState) {
    const { tablerows } = getState().table;
    ipcRenderer.send("save:row", JSON.stringify(tablerows));
    ipcRenderer.once("row:saved", () => {
      toast.warn("Saved Successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    });
  };
}
