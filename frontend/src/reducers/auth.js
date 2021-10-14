// Import Constants
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  PROFILE_RETRIEVE_SUCCESS,
  PROFILE_RETRIEVE_FAILURE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  DELETE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_SUCCESS,
} from "../constants/ReduxConstants";

const defaultState = {
  loginLoading: false,
  loginSuccess: false,
  loginFailure: false,
  // isAuthenticated: false,
  logoutLoading: false,
  logoutSuccess: false,
  logoutFailure: false,
  user: {},
};

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginFailure: false,
        loginSuccess: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true, // Can replace with isAuthenticated after setting up authentication
        loginFailure: false,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        loginFailure: true,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
        logoutSuccess: false,
        logoutFailure: false,
      };
    case LOGOUT_SUCCESS:
      return defaultState;
    case LOGOUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutSuccess: false,
        logoutFailure: true,
      };
    case PROFILE_RETRIEVE_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        logoutSuccess: false,
        logoutFailure: false,
        user: action.payload,
      };
    case PROFILE_RETRIEVE_FAILURE:
      return { ...state };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        logoutSuccess: false,
        logoutFailure: false,
        user: action.payload,
      };
    case PROFILE_UPDATE_FAILURE:
      return { state };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        loginFailure: false,
        user: {},
      };
    case DELETE_ACCOUNT_FAILURE:
      return { state };
    default:
      return state;
  }
}
