import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';

// Import constants
import { 
  SUCCESS, 
  FAILURE, 
  RESET,
  VERIFIED
} from '../constants/ReduxConstants.js';

const signupSuccess = (email) => {
  return {
    type: SUCCESS,
    payload: email
  };
};

const signupFailure = (err) => {
  for(var i = 0; i < err.length; i++) {
    toast.error(err[i].msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  return {
    type: FAILURE
  };
};

const verifyEmail = (_email, _status) => {
  return {
    type: VERIFIED,
    payload: {
      email: _email,
      verified: _status
    }
  };
};

export const signupReset = () => {
  return {
    type: RESET
  };
};

// Handle user sign up 
export const handleUserSignUp = (_name, _email, _password) => dispatch => {
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/users/signup`;

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      name: _name,
      email: _email,
      password: _password
    })
  }).then(response => {
    if (response.ok) { 
      dispatch(signupSuccess(_email));
      // Route to verify email page
      let history = useHistory();
      history.push("/verify-email");
    } else {
      response.json().then(res => dispatch(signupFailure(res)));
    }
  }).catch((err) => {
    err.json().then(res => dispatch(signupFailure(res)));
  });
};

//Verify email
export const handleEmailVerification = (_token) => dispatch => {
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/XXXXX`;

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      token: _token
    })
  }).then(response => {
    if (response.ok) { 
      response.json().then(res => dispatch(verifyEmail(res.email, true)));
    } else {
      response.json().then(res => dispatch(verifyEmail(res.email, false)));
    }
  }).catch((err) => {
    err.json().then(res => dispatch(verifyEmail(res.email, false)));
  });
};

//Resend email verification
// export const handleResendEmailVerification = (_token) => dispatch => {
//   const requestUrl = `${process.env.REACT_APP_API_URL}/api/XXXXX`;

//   fetch(requestUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: new URLSearchParams({
//       token: _token
//     })
//   }).then(response => {
//     if (response.ok) { 
//       response.json().then(res => dispatch(verifyEmail(res.email, true)));
//     } else {
//       response.json().then(res => dispatch(verifyEmail(res.email, false)));
//     }
//   }).catch((err) => {
//     err.json().then(res => dispatch(verifyEmail(res.email, false)));
//   });
// };
