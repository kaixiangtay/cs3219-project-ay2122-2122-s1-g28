import { toast } from "react-toastify";

// Import Constants
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
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
