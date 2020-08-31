import * as actionTypes from "../actions/actionTypes";
export default function errorReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.SHOW_ERROR:
      console.log("inside show error reducer", action.error);
      const error = {
        show: true,
        heading: action.error.name,
        msg: action.error.message,
      };
      return error;
    case actionTypes.HIDE_ERROR:
      console.log("inside error reducer");

      return { show: false };
    default:
      return state;
  }
}
