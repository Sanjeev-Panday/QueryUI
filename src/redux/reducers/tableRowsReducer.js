import * as actionTypes from "../actions/actionTypes";
export default function tableRowsReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_TABLE_ROWS:
      console.log("inside reducer", action.rows);
      return action.rows;
    case actionTypes.CLEAR_TABLE_ROWS:
      return [];
    default:
      return state;
  }
}
