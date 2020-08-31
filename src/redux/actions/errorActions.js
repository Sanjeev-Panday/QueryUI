import * as actionTypes from "./actionTypes";
export function hideErrorMessage(error) {
  return {
    type: actionTypes.HIDE_ERROR,
  };
}
