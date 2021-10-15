// Import Constants
import {
  PROFILE_RETRIEVE_SUCCESS,
  PROFILE_RETRIEVE_FAILURE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  DELETE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_SUCCESS,
} from "../constants/ReduxConstants";

const defaultState = {
  profileRetrieveSuccess: false,
  profileRetrieveFailure: false,
  profileUpdateSuccess: false,
  profileUpdateFailure: false,
  deleteAccountSuccess: false,
  deleteAccountFailure: false,
  data: {},
};

export default function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case PROFILE_RETRIEVE_SUCCESS:
      return {
        ...state,
        profileRetrieveSuccess: true,
        profileRetrieveFailure: false,
        profileUpdateSuccess: false,
        profileUpdateFailure: false,
        deleteAccountSuccess: false,
        deleteAccountFailure: false,
        data: action.payload,
      };
    case PROFILE_RETRIEVE_FAILURE:
      return {
        ...state,
        profileRetrieveSuccess: false,
        profileRetrieveFailure: true,
        profileUpdateSuccess: false,
        profileUpdateFailure: false,
        deleteAccountSuccess: false,
        deleteAccountFailure: false,
        data: state.data,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        profileRetrieveSuccess: false,
        profileRetrieveFailure: false,
        profileUpdateSuccess: true,
        profileUpdateFailure: false,
        deleteAccountSuccess: false,
        deleteAccountFailure: false,
        data: action.payload,
      };
    case PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        profileRetrieveSuccess: false,
        profileRetrieveFailure: false,
        profileUpdateSuccess: false,
        profileUpdateFailure: true,
        deleteAccountSuccess: false,
        deleteAccountFailure: false,
        data: state.data,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        profileRetrieveSuccess: false,
        profileRetrieveFailure: false,
        profileUpdateSuccess: false,
        profileUpdateFailure: false,
        deleteAccountSuccess: true,
        deleteAccountFailure: false,
        data: {},
      };
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        profileRetrieveSuccess: false,
        profileRetrieveFailure: false,
        profileUpdateSuccess: false,
        profileUpdateFailure: false,
        deleteAccountSuccess: false,
        deleteAccountFailure: true,
        data: state.data,
      };
    default:
      return state;
  }
}
