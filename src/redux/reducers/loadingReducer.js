import * as actionTypes from "../actions/actionTypes";
export default function loadingReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.SHOW_SPINNER:
      return { isLoading: true };
    case actionTypes.HIDE_SPINNER:
      return { isLoading: false };
    default:
      return state;
  }
}
