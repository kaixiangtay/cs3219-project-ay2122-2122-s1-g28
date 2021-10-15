import { toast } from "react-toastify";

// Import Constants
import {
  PROFILE_RETRIEVE_SUCCESS,
  PROFILE_RETRIEVE_FAILURE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
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

const profileUpdateSuccess = () => {
  return {
    type: PROFILE_UPDATE_SUCCESS,
  };
};

const profileUpdateFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: PROFILE_UPDATE_FAILURE,
  };
};

const deleteAccountSuccess = () => {
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

// ===================================================================
// HANDLING API CALLS
// ===================================================================

// Handle retrieve Profile Information
export const handleProfileRetrieval = (token) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/users/${token}`;

  fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => dispatch(profileRetrieveSuccess(res)));
      } else {
        response.json().then((res) => dispatch(profileRetrieveFailure(res)));
      }
    })
    .catch((err) => {
      alert(err);
    });
};

// Handle update Profile Information
export const handleProfileUpdate =
  (_token, _name, _password, verifyPassword) => (dispatch) => {
    const requestUrl = `${process.env.REACT_APP_API_URL}/api/users/update/${_token}`;

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
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(bodyContent),
    })
      .then((response) => {
        if (response.ok) {
          dispatch(profileUpdateSuccess());
        } else {
          response.json().then((res) => dispatch(profileUpdateFailure(res)));
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

// Handle delete account
export const handleDeleteAccount = (_token) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/users/delete/${_token}`;

  fetch(requestUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        dispatch(deleteAccountSuccess());
      } else {
        response.json().then((res) => dispatch(deleteAccountFailure(res)));
      }
    })
    .catch((err) => {
      alert(err);
    });
};
