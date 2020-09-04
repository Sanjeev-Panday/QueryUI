import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  tableinfo: {},
  tablerows: [],
  queryForm: {},
};
export default function tableReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.LOAD_TABLE_META_DATA:
      return { ...state, tableinfo: action.tableinfo, queryForm: {} };
    case actionTypes.RESET_TABLE_DATA:
      return INITIAL_STATE;
    case actionTypes.FETCH_TABLE_ROWS:
      console.log({ ...state, tablerows: action.rows });
      return { ...state, tablerows: action.rows };
    case actionTypes.CLEAR_TABLE_ROWS:
      return { ...state, tablerows: [] };
    case actionTypes.UPDATE_QUERY_FORM:
      let newForm = { ...state.queryForm, [action.target]: action.value };
      return { ...state, queryForm: newForm };
    case actionTypes.RESET_QUERY_FORM:
      return { ...state, queryForm: {} };
    default:
      return state;
  }
}
