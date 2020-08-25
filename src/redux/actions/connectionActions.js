import * as actionTypes from "./actionTypes";
export function openConnection(connection) {
  return {
    type: actionTypes.OPEN_CONNECTION,
    connection: connection,
  };
}

export function closeConnection(connection) {
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
