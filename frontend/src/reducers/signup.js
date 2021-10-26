// Import constants
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  VERIFIED,
  RESET,
} from "../constants/ReduxConstants.js";

const defaultState = {
  signupSuccess: false,
  signupFailure: false,
  resetPasswordSuccess: false,
  resetPasswordFailure: false,
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
        resetPasswordSuccess: false,
        resetPasswordFailure: false,
        verified: false,
        email: action.payload,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signupSuccess: false,
        signupFailure: true,
        resetPasswordSuccess: false,
        resetPasswordFailure: false,
        verified: false,
        email: "",
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
        signupFailure: false,
        resetPasswordSuccess: true,
        resetPasswordFailure: false,
        verified: false,
        email: "",
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        signupSuccess: false,
        signupFailure: true,
        resetPasswordSuccess: false,
        resetPasswordFailure: true,
        verified: false,
        email: "",
      };
    case VERIFIED:
      return {
        ...state,
        signupSuccess: false,
        signupFailure: false,
        resetPasswordSuccess: false,
        resetPasswordFailure: false,
        verified: action.payload,
        email: state.email,
      };
    case RESET:
      return defaultState;
    default:
      return state;
  }
}

export default signupReducer;
