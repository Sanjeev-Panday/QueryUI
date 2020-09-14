import * as types from "../actions/actionTypes";
const INITIAL_STATE = {
  tableinfo: {},
  tablerows: [],
  queryForm: {},
  clickedRow: -1,
  toggleMenu: false,
  menuType: "",
  updateTableForm: {},
  formType: "",
  operation: "",
};
export default function tableReducer(state = INITIAL_STATE, action) {
  let updatedRows = [];
  switch (action.type) {
    case types.LOAD_TABLE_META_DATA:
      return {
        ...state,
        tableinfo: action.tableinfo,
        queryForm: {},
        formType: "query",
      };
    case types.RESET_TABLE_DATA:
      return INITIAL_STATE;
    case types.FETCH_TABLE_ROWS:
      return { ...state, tablerows: action.rows };
    case types.CLEAR_TABLE_ROWS:
      return { ...state, tablerows: [] };
    case types.UPDATE_QUERY_FORM:
      let newForm = { ...state.queryForm, [action.target]: action.value };
      return { ...state, queryForm: newForm };
    case types.RESET_QUERY_FORM:
      return { ...state, queryForm: {} };
    case types.SHOW_CONTEXT_MENU:
      const { clickedRow, menuType } = action;
      return { ...state, clickedRow, toggleMenu: !state.toggleMenu, menuType };
    case types.SHOW_UPDATE_FORM:
      return {
        ...state,
        formType: action.formType,
        updateTableForm: action.row,
      };
    case types.ROW_UPDATE_SUCCESSFUL:
      updatedRows = [...state.tablerows];
      updatedRows[state.clickedRow] = action.updateForm;

      return {
        ...state,
        tablerows: updatedRows,
        updateTableForm: action.updateForm,
      };
    case types.SHOW_DELETE_CONFIRMATION:
      return {
        ...state,
        operation: action.operation,
      };
    case types.HIDE_DELETE_CONFIRMATION:
      return {
        ...state,
        operation: "",
      };
    case types.ROW_DELETE_SUCCESSFUL:
      updatedRows = [...state.tablerows];
      updatedRows.splice(state.clickedRow, 1);
      return {
        ...state,
        tablerows: updatedRows,
        operation: "",
      };
    default:
      return state;
  }
}
