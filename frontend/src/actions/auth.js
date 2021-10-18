import { toast } from "react-toastify";

// Import Constants
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  TOKEN_EXPIRE,
} from "../constants/ReduxConstants";

// ===================================================================
// LOGIN STATE CHANGE
// ===================================================================

const loginSuccess = (_payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: _payload.token,
  };
};

const loginFailure = (err) => {
  for (var i = 0; i < err.length; i++) {
    toast.error(err[i].msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

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

const logoutFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: LOGOUT_FAILURE,
  };
};

export const tokenExpire = () => {
  return {
    type: TOKEN_EXPIRE,
  };
};

// ===================================================================
// HANDLING API CALLS
// ===================================================================

// Handle user login
export const handleUserLogin = (_email, _password) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL_USERS}/api/users/login`;

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
        response.json().then((res) => dispatch(loginSuccess(res)));
      } else {
        response.json().then((res) => dispatch(loginFailure(res)));
      }
    })
    .catch((err) => {
      dispatch(loginFailure(err));
    });
};

export const handleUserLogout = (token) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL_USERS}/api/users/logout`;

  fetch(requestUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        dispatch(logoutSuccess());
      } else {
        response.json().then((res) => dispatch(logoutFailure(res)));
      }
    })
    .catch(() => {
      dispatch(tokenExpire());
    });
};
