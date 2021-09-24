import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/auth";

const defaultState = {
  loginLoading: false, 
  loginSuccess: false,
  loginFailure: false, 
  // isAuthenticated: false, 
  user: {}
};

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginFailure: false,
        loginSuccess: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true, // Can replace with isAuthenticated after setting up authentication
        loginFailure: false, 
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        loginFailure: true
      };
    default:
      return state;
  }
};
