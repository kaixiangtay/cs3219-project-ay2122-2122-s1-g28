// Import Constants
import {
  RESET,
  PROFILE_RETRIEVE_SUCCESS,
  PROFILE_RETRIEVE_FAILURE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  PROFILE_IMAGE_UPLOAD_SUCCESS,
  PROFILE_IMAGE_UPLOAD_FAILURE,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
} from "../constants/ReduxConstants";

const defaultState = {
  profileRetrieveSuccess: false,
  profileRetrieveFailure: false,
  profileUpdateSuccess: false,
  profileUpdateFailure: false,
  profileImageUploadSuccess: false,
  profileImageUploadFailure: false,
  deleteAccountSuccess: false,
  deleteAccountFailure: false,
  data: {
    name: "",
    email: "",
    profileImageUrl: "",
  },
};

export default function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case PROFILE_RETRIEVE_SUCCESS:
      return {
        ...state,
        profileRetrieveSuccess: true,
        profileImageUploadSuccess: false,
        data: action.payload,
      };
    case PROFILE_RETRIEVE_FAILURE:
      return {
        ...state,
        profileRetrieveFailure: true,
        data: state.data,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        profileRetrieveSuccess: false,
        profileImageUploadSuccess: false,
        profileUpdateSuccess: true,
        data: action.payload,
      };
    case PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        profileRetrieveSuccess: false,
        profileImageUploadSuccess: false,
        profileUpdateFailure: true,
        data: state.data,
      };
    case PROFILE_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        profileRetrieveSuccess: false,
        profileImageUploadSuccess: true,
        data: action.payload,
      };
    case PROFILE_IMAGE_UPLOAD_FAILURE:
      return {
        ...state,
        profileRetrieveSuccess: false,
        profileImageUploadFailure: true,
        data: state.data,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        deleteAccountSuccess: true,
      };
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        deleteAccountFailure: true,
        data: state.data,
      };
    case RESET:
      return defaultState;
    default:
      return state;
  }
}
