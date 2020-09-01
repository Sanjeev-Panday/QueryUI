import * as actionTypes from "../actions/actionTypes";
const initialState = {
  isLoading: false,
};
export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_SPINNER:
      return { isLoading: true };
    case actionTypes.HIDE_SPINNER:
      return { isLoading: false };
    default:
      return state;
  }
}
