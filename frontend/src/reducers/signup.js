import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  RESET_STATE
} from "../actions/signup";

const defaultState = {
  signupSuccess: false,
  signupFailure: false
};

function signupReducer(state = defaultState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true, 
        signupFailure: false
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signupSuccess: false,
        signupFailure: true
      };
    case RESET_STATE:
      return {
        ...state,
        signupSuccess: false,
        signupFailure: false
      };
    default:
      return state;
  }
};

export default signupReducer;