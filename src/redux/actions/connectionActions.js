import * as actionTypes from "./actionTypes";
import { toast } from "react-toastify";
export function openConnection(connection) {
  toast.info("Connected.", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
  return {
    type: actionTypes.OPEN_CONNECTION,
    connection: connection,
  };
}

export function closeConnection(connection) {
  toast.info("Connection closed.", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
  return {
    type: actionTypes.CLOSE_CONNECTION,
    connection: connection,
  };
}
export function addConnection(connection) {
  return {
    type: actionTypes.ADD_CONNECTION,
    connection: connection,
  };
}

export function loadConnections(connections) {
  return {
    type: actionTypes.LOAD_CONNECTIONS,
    connections,
  };
}
export function loadKeyspaces(keyspaces) {
  return {
    type: actionTypes.LOAD_KEYSPACES,
    keyspaces,
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
