import * as actionTypes from "../actions/actionTypes";
export default function tableMetaDataReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.LOAD_TABLE_META_DATA:
      return action.tableinfo;
    case actionTypes.CLEAR_TABLE_META_DATA:
      return {};
    default:
      return state;
  }
}
