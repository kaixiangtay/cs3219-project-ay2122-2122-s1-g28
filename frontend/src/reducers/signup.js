//Import constants
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  VERIFIED,
  RESET,
} from "../constants/ReduxConstants.js";

const defaultState = {
  signupSuccess: false,
  signupFailure: false,
  verified: false,
  email: "",
};

function signupReducer(state = defaultState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
        signupFailure: false,
        verified: false,
        email: action.payload,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signupSuccess: false,
        signupFailure: true,
        verified: false,
        email: "",
      };
    case VERIFIED:
      return {
        ...state,
        signupSuccess: false,
        signupFailure: false,
        verified: action.payload,
        email: state.email,
      };
    case RESET:
      return {
        ...state,
        signupSuccess: false,
        signupFailure: false,
        verified: false,
        email: "",
      };
    default:
      return state;
  }
}

export default signupReducer;
