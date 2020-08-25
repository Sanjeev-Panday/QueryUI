import * as actionTypes from "../actions/actionTypes";
export default function tableReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.LOAD_TABLES:
      return action.tables;
    default:
      return state;
  }
}
