import { toast } from "react-toastify";

// Import constants
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET,
  VERIFIED,
} from "../constants/ReduxConstants.js";

// ===================================================================
// SIGNUP STATE CHANGE
// ===================================================================

const signupSuccess = (email) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: email,
  };
};

const signupFailure = (err) => {
  for (var i = 0; i < err.length; i++) {
    toast.error(err[i].msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  return {
    type: SIGNUP_FAILURE,
  };
};

const resetPasswordSuccess = (err) => {
  toast.success(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });

  return {
    type: RESET_PASSWORD_SUCCESS,
  };
};

const resetPasswordFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });

  return {
    type: RESET_PASSWORD_FAILURE,
  };
};

const verifyEmail = (_email, _status) => {
  return {
    type: VERIFIED,
    payload: {
      email: _email,
      verified: _status,
    },
  };
};

// Clear all signup state
export const signupReset = () => {
  return {
    type: RESET,
  };
};

// ===================================================================
// HANDLING API CALLS
// ===================================================================

// Handle user sign up
export const handleUserSignUp = (_name, _email, _password) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL_USERS}/api/users/signup`;

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name: _name,
      email: _email,
      password: _password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        dispatch(signupSuccess(_email));
      } else {
        response.json().then((res) => dispatch(signupFailure(res)));
      }
    })
    .catch((err) => {
      dispatch(signupFailure(err));
    });
};

//Verify email
export const handleEmailVerification = (_token) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL_USERS}/api/users/verifyEmail/${_token}`;

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => dispatch(verifyEmail(res.email, true)));
      } else {
        response.json().then((res) => dispatch(verifyEmail(res.email, false)));
      }
    })
    .catch((err) => {
      alert(err);
    });
};

// Resend email verification
export const handleResendEmailVerification = (_email) => {
  const requestUrl = `${process.env.REACT_APP_API_URL_USERS}/api/users/resendEmail`;

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email: _email,
    }),
  })
    .then((response) => {
      response.json().then((res) => console.log(res));
    })
    .catch((err) => {
      err.json().then((res) => console.log(res));
    });
};

export const handleResetPassword = (_email) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL_USERS}/api/users/resetPassword`;

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email: _email,
    }),
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => dispatch(resetPasswordSuccess(res)));
      } else {
        response.json().then((res) => dispatch(resetPasswordFailure(res)));
      }
    })
    .catch((err) => {
      err.json().then((res) => console.log(res));
    });
};
