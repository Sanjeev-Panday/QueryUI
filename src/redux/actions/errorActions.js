import * as actionTypes from "./actionTypes";
export function showErrorMessage(error) {
  return {
    type: actionTypes.SHOW_ERROR,
    error,
  };
}
export function hideErrorMessage(error) {
  console.log("insiee hid err action");
  return {
    type: actionTypes.HIDE_ERROR,
  };
}
