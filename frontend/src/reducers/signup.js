import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
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
    default:
      return state;
  }
};

export default signupReducer;