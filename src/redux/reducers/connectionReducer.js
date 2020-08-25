import * as actionTypes from "../actions/actionTypes";
export default function connectionReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_CONNECTION:
      return [...state, action.connection];
    case actionTypes.LOAD_CONNECTIONS:
      console.log(action);
      return action.connections;
    case actionTypes.OPEN_CONNECTION:
      const newState = [...state];
      const conn = newState.map((elem) =>
        elem.connectionName === action.connection.connectionName
          ? { ...elem, isConnected: true }
          : { ...elem }
      );
      return conn;
    case actionTypes.CLOSE_CONNECTION:
      const updated = [...state].map((elem) =>
        elem.connectionName === action.connection.connectionName
          ? { ...elem, isConnected: false }
          : { ...elem }
      );
      return updated;

    default:
      return state;
  }
}
