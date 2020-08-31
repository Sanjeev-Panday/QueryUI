import * as actionTypes from "./actionTypes";

//import { getKeyspaces } from "../../server/db-operations";
const { ipcRenderer } = window.require("electron");
export function addConnection(connection) {
  return {
    type: actionTypes.ADD_CONNECTION,
    connection: connection,
  };
}
export const loadConnections = (connections) => {
  return {
    type: actionTypes.LOAD_CONNECTIONS,
    connections,
  };
};
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

export function showSpinner() {
  return {
    type: actionTypes.SHOW_SPINNER,
  };
}

export function hideSpinner() {
  return {
    type: actionTypes.HIDE_SPINNER,
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
    ipcRenderer.send("connect:db", params);
    ipcRenderer.once("db:connected", (event, keyspaces) => {
      dispatch(connectToDBSuccess(params, keyspaces));
    });
    ipcRenderer.on("db:connection:failed", (event, msg) => {
      dispatch(connectToDBFailed(msg));
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
