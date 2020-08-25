import * as actionTypes from "../actions/actionTypes";
export default function keyspaceReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.LOAD_KEYSPACES:
      return action.keyspaces;
    default:
      return state;
  }
}
