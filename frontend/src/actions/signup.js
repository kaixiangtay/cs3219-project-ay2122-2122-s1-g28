import { toast } from "react-toastify";

// Import constants
import { 
  SUCCESS, 
  FAILURE, 
  RESET,
  VERIFIED
} from '../constants/ReduxConstants.js';

export const signupSuccess = (email) => {
  return {
    type: SUCCESS,
    payload: email
  };
};

export const signupFailure = (err) => {
  for(var i = 0; i < err.length; i++) {
    toast.error(err[i].msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  return {
    type: FAILURE
  };
};

export const signupReset = () => {
  return {
    type: RESET
  };
};

export const signupVerified = () => {
  return {
    type: VERIFIED
  };
};

// Handle user sign up 
export const handleSignUpApi = (_name, _email, _password) => dispatch => {
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
    } else {
      response.json().then(res => dispatch(signupFailure(res)));
    }
  }).catch((err) => {
    err.json().then(res => dispatch(signupFailure(res)));
  });
};