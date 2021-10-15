import { toast } from "react-toastify";

// Import Constants
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  PROFILE_RETRIEVE_SUCCESS,
  PROFILE_RETRIEVE_FAILURE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
} from "../constants/ReduxConstants";

// ===================================================================
// LOGIN STATE CHANGE
// ===================================================================

const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    token: payload.token,
  };
};

const loginFailure = (err) => {
  toast.error(err, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: LOGIN_FAILURE,
  };
};

const logoutSuccess = () => {
  toast.success("Successfully logout!", {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutFailure = () => {
  toast.error("Unable to logout. Please try again!", {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: LOGOUT_FAILURE,
  };
};

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

// Handle user login
export const handleUserLogin = (_email, _password) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/users/login`;

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email: _email,
      password: _password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => dispatch(dispatch(loginSuccess(res))));
      } else {
        response.json().then((res) => dispatch(dispatch(loginFailure(res))));
      }
    })
    .catch((err) => {
      alert(err);
    });
};

export const handleUserLogout = () => (dispatch) => {
  try {
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
    alert(err);
  }
};

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
