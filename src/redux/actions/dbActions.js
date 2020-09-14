import * as actionTypes from "./actionTypes";

//import { getKeyspaces } from "../../server/db-operations";
const { ipcRenderer } = window.require("electron");

export function loadKeyspaces(keyspaces) {
  return {
    type: actionTypes.LOAD_KEYSPACES,
    keyspaces,
  };
}
export function loadTables(keyspace) {
  return function (dispatch) {
    ipcRenderer.send("fetch:tables", keyspace);
    ipcRenderer.once("tables:fetched", (event, tables) => {
      dispatch({
        type: actionTypes.LOAD_TABLES,
        tables,
      });
    });
  };
}

export function connectToDBFailed(error) {
  return {
    type: actionTypes.SHOW_ERROR,
    error,
  };
}

export function connectToDBSuccess(connection, keyspaces) {
  return {
    type: actionTypes.OPEN_CONNECTION,
    connection: connection,
    keyspaces: keyspaces,
  };
}
export function connectToDB(params) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SHOW_SPINNER,
    });
    ipcRenderer.send("connect:db", params);
    ipcRenderer.once("db:connected", (event, keyspaces) => {
      dispatch(connectToDBSuccess(params, keyspaces));
      dispatch({
        type: actionTypes.HIDE_SPINNER,
      });
    });
    ipcRenderer.on("db:connection:failed", (event, msg) => {
      dispatch(connectToDBFailed(msg));
      dispatch({
        type: actionTypes.HIDE_SPINNER,
      });
    });
  };
}

export function disconnectFromDBSuccess(connection) {
  return {
    type: actionTypes.CLOSE_CONNECTION,
    connection: connection,
  };
}

export function disconnectFromDB(params) {
  return function (dispatch) {
    ipcRenderer.send("disconnect:db", params);
    ipcRenderer.once("db:disconnected", (event, _) => {
      dispatch(disconnectFromDBSuccess(params));
    });
  };
}

export function loadConnections() {
  return function (dispatch) {
    ipcRenderer.send("load:connections");
    ipcRenderer.once("connections:loaded", (event, connections) => {
      dispatch({
        type: actionTypes.LOAD_CONNECTIONS_SUCCESS,
        connections,
      });
    });
  };
}

export function addConnection(connection) {
  return function (dispatch) {
    ipcRenderer.send("add:connection", connection);
    ipcRenderer.once("connection:added", (event, _) => {
      dispatch({ type: actionTypes.ADD_CONNECTION_SUCCESS, connection });
    });
  };
}

export function updateConnection(connection) {
  return function (dispatch) {
    ipcRenderer.send("add:connection", connection);
    ipcRenderer.once("connection:added", (event, _) => {
      dispatch({ type: actionTypes.UPDATE_CONNECTION_SUCCESS, connection });
    });
  };
}

export function deleteConnection(name) {
  return function (dispatch) {
    ipcRenderer.send("delete:connection", name);
    ipcRenderer.once("connection:deleted", (event, _) => {
      dispatch({ type: actionTypes.DELETE_CONNECTION_SUCCESS, name });
    });
  };
}
