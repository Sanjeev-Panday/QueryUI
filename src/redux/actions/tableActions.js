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
      (!rows || rows.length === 0) && toast.warn("No rows fetched!");

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

export function updateRow(query, options, updateForm) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SHOW_SPINNER,
    });
    ipcRenderer.send("update:row", query, options);
    ipcRenderer.once("row:updated", () => {
      dispatch({
        type: actionTypes.HIDE_SPINNER,
      });
      toast.success("Updated Successfully!!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch({
        type: actionTypes.ROW_UPDATE_SUCCESSFUL,
        updateForm,
      });
    });
    ipcRenderer.once("row:update:failed", (event, error) => {
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
        position: toast.POSITION.BOTTOM_CENTER,
      });
    });
  };
}

export function copyAllRows() {
  return function (dispatch, getState) {
    const { tablerows } = getState().table;
    ipcRenderer.send("copy:rows", JSON.stringify(tablerows));
    ipcRenderer.once("rows:copied", () => {
      toast.success("Copied!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    });
  };
}

export function saveSelectedRow() {
  return function (dispatch, getState) {
    const { tablerows, clickedRow } = getState().table;
    ipcRenderer.send("save:row", JSON.stringify(tablerows[clickedRow]));
    ipcRenderer.once("row:saved", () => {
      toast.success("Saved Successfully!");
    });
  };
}
export function saveAllRows() {
  return function (dispatch, getState) {
    const { tablerows } = getState().table;
    ipcRenderer.send("save:row", JSON.stringify(tablerows));
    ipcRenderer.once("row:saved", () => {
      toast.warn("Saved Successfully!");
    });
  };
}
export function showUpdateForm() {
  return function (dispatch, getState) {
    const { tablerows, clickedRow } = getState().table;
    dispatch({
      type: actionTypes.SHOW_UPDATE_FORM,
      formType: "update",
      row: tablerows[clickedRow],
    });
  };
}
export function showDeleteConfirmation() {
  return {
    type: actionTypes.SHOW_DELETE_CONFIRMATION,
    operation: "delete",
  };
}
export function deleteSelectedRow() {
  return function (dispatch, getState) {
    dispatch({
      type: actionTypes.SHOW_SPINNER,
    });
    const { tablerows, clickedRow, tableinfo } = getState().table;
    const { keyspaceName, name, partitionKeys, clusteringKeys } = tableinfo;
    const selectedRow = tablerows[clickedRow];
    const primaryKey = partitionKeys.concat(clusteringKeys);
    const where = [];
    let queryString = `delete from ${keyspaceName}.${name} where `;
    primaryKey.forEach((elem) => {
      queryString += elem.name + " = ? and ";

      where.push(
        selectedRow[elem.name] instanceof Object
          ? JSON.stringify(selectedRow[elem.name])
              .toString()
              .replace(/^"(.*)"$/, "$1")
          : selectedRow[elem.name]
      );
    });
    queryString =
      queryString.substr(0, queryString.lastIndexOf("and")).trim() + `;`;
    ipcRenderer.send("delete:row", queryString, where);
    ipcRenderer.once("row:deleted", () => {
      dispatch({
        type: actionTypes.HIDE_SPINNER,
      });
      dispatch({
        type: actionTypes.ROW_DELETE_SUCCESSFUL,
      });
      toast.warn("Deleted Successfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });

      dispatch({
        type: actionTypes.HIDE_DELETE_CONFIRMATION,
      });
    });
    ipcRenderer.once("row:delete:failed", (event, error) => {
      dispatch({
        type: actionTypes.HIDE_SPINNER,
      });
      dispatch({
        type: actionTypes.HIDE_DELETE_CONFIRMATION,
      });
      dispatch({
        type: actionTypes.SHOW_ERROR,
        error,
      });
    });
  };
}
export function hideConfirmationMessage() {
  return {
    type: actionTypes.HIDE_DELETE_CONFIRMATION,
  };
}
