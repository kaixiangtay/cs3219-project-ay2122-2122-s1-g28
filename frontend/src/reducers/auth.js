// Import Constants
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  TOKEN_EXPIRE,
} from "../constants/ReduxConstants";

const defaultState = {
  loginSuccess: false,
  loginFailure: false,
  logoutSuccess: false,
  logoutFailure: false,
  token: null,
};

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        loginFailure: false,
        logoutSuccess: false,
        logoutFailure: false,
        token: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginSuccess: false,
        loginFailure: true,
        logoutSuccess: false,
        logoutFailure: false,
        token: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loginSuccess: false,
        loginFailure: false,
        logoutSuccess: true,
        logoutFailure: false,
        token: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        loginSuccess: false,
        loginFailure: false,
        logoutSuccess: false,
        logoutFailure: true,
        token: null,
      };
    case TOKEN_EXPIRE:
      return {
        ...state,
        loginSuccess: false,
        loginFailure: false,
        logoutSuccess: false,
        logoutFailure: false,
        token: null,
      };
    default:
      return state;
  }
}
