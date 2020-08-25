import * as actionTypes from "../actions/actionTypes";
export default function tableMetaDataReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.LOAD_TABLE_META_DATA:
      console.log(action.tableinfo);
      return action.tableinfo;
    default:
      return state;
  }
}
