import * as actionTypes from "./actionTypes";
export function loadTableMetaData(tableinfo) {
  return {
    type: actionTypes.LOAD_TABLE_META_DATA,
    tableinfo,
  };
}

export function clearTableMetaData() {
  return {
    type: actionTypes.CLEAR_TABLE_META_DATA,
  };
}
