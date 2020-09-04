import * as actionTypes from "../actions/actionTypes";
export default function errorReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.SHOW_ERROR:
      const error = {
        show: true,
        heading: action.error.name,
        msg: action.error.message,
      };
      return error;
    case actionTypes.HIDE_ERROR:
      return { show: false };
    default:
      return state;
  }
}
