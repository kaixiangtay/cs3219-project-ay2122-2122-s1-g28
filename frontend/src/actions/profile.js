import { toast } from "react-toastify";

// Import tokenExpire to update if token expired
import { tokenExpire } from "./auth.js";

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

// ===================================================================
// PROFILE STATE CHANGE
// ===================================================================

const profileRetrieveSuccess = (_payload) => {
  return {
    type: PROFILE_RETRIEVE_SUCCESS,
    payload: _payload.data,
  };
};

const profileRetrieveFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: PROFILE_RETRIEVE_FAILURE,
  };
};

const profileUpdateSuccess = (_payload) => {
  toast.success(_payload.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: PROFILE_UPDATE_SUCCESS,
    payload: _payload.data,
  };
};

const profileUpdateFailure = (err) => {
  for (var i = 0; i < err.length; i++) {
    toast.error(err[i].msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return {
    type: PROFILE_UPDATE_FAILURE,
  };
};

const profileImageUploadSuccess = (_payload) => {
  return {
    type: PROFILE_IMAGE_UPLOAD_SUCCESS,
    payload: _payload.data,
  };
};

const profileImageUploadFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: PROFILE_IMAGE_UPLOAD_FAILURE,
  };
};

const deleteAccountSuccess = (payload) => {
  toast.success(payload.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: DELETE_ACCOUNT_SUCCESS,
  };
};

const deleteAccountFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: DELETE_ACCOUNT_FAILURE,
  };
};

// Clear all signup state
export const profileReset = () => {
  return {
    type: RESET,
  };
};

// ===================================================================
// HANDLING API CALLS
// ===================================================================

// Handle retrieve Profile Information
export const handleProfileRetrieval = (token) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL_USERS}/api/users/getUser`;

  fetch(requestUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => dispatch(profileRetrieveSuccess(res)));
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then((res) => dispatch(profileRetrieveFailure(res)));
      }
      return response;
    })
    .catch(() => {
      dispatch(tokenExpire());
    });
};

// Handle update Profile Information
export const handleProfileUpdate =
  (token, _name, _password, verifyPassword) => (dispatch) => {
    const requestUrl = `${process.env.REACT_APP_API_URL_USERS}/api/users/update`;

    // If user inputs password, then pass in password field in body
    let bodyContent = verifyPassword
      ? {
          name: _name,
          password: _password,
        }
      : {
          name: _name,
        };

    fetch(requestUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(bodyContent),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((res) => dispatch(profileUpdateSuccess(res)));
        } else if (response.status == 401) {
          dispatch(tokenExpire());
        } else {
          response.json().then((res) => dispatch(profileUpdateFailure(res)));
        }
      })
      .catch(() => {
        dispatch(tokenExpire());
      });
  };

// Handle upload Profile Image
export const handleProfileImageUpload =
  (token, _profileImage) => (dispatch) => {
    const requestUrl = `${process.env.REACT_APP_API_URL_USERS}/api/users/uploadProfileImage`;
    var formData = new FormData();
    formData.append("profileImage", _profileImage);

    fetch(requestUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        headers: { "Content-Type": "multipart/form-data" },
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((res) => dispatch(dispatch(profileImageUploadSuccess(res))));
        } else if (response.status == 401) {
          dispatch(tokenExpire());
        } else {
          response
            .json()
            .then((res) => dispatch(profileImageUploadFailure(res)));
        }
      })
      .catch(() => {
        dispatch(tokenExpire());
      });
  };

// Handle delete account
export const handleDeleteAccount = (token) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL_USERS}/api/users/delete`;

  fetch(requestUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => dispatch(deleteAccountSuccess(res)));
        dispatch(tokenExpire());
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then((res) => dispatch(deleteAccountFailure(res)));
      }
    })
    .catch(() => {
      dispatch(tokenExpire());
    });
};
