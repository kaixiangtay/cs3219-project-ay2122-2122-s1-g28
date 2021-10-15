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
  toast.error(err.msg, {
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

const logoutFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: LOGOUT_FAILURE,
  };
};

export const tokenExpire = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: TOKEN_EXPIRE,
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

export const handleUserLogout = (_token) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/users/logout/${_token}`;

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        dispatch(logoutSuccess());
      } else {
        response.json().then((res) => dispatch(dispatch(logoutFailure(res))));
      }
    })
    .catch((err) => {
      alert(err);
    });
};
