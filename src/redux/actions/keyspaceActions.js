import * as actionTypes from "./actionTypes";
export function loadTables(tables) {
  return {
    type: actionTypes.LOAD_TABLES,
    tables,
  };
}
