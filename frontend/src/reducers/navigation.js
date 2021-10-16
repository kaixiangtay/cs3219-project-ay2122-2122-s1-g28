// Import constants
import {
  FINDFRIENDS,
  FORUM,
  PROFILE,
  LOGOUT,
  RESET,
} from "../constants/ReduxConstants.js";

const defaultState = {
  selection: FINDFRIENDS,
};

function navigationReducer(state = defaultState, action) {
  switch (action.type) {
    case FINDFRIENDS:
      return {
        ...state,
        selection: FINDFRIENDS,
      };
    case FORUM:
      return {
        ...state,
        selection: FORUM,
      };
    case PROFILE:
      return {
        ...state,
        selection: PROFILE,
      };
    case LOGOUT:
      return {
        ...state,
        selection: LOGOUT,
      };
    case RESET:
      return defaultState;
    default:
      return state;
  }
}

export default navigationReducer;
