import { toast } from "react-toastify";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS
  };
};

export const signupFailure = (err) => {
  for(var i = 0; i < err.length; i++) {
    toast.error(err[i].msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  return {
    type: SIGNUP_FAILURE
  };
};

// Handle user sign up 
export const signupUser = (_name, _email, _password) => dispatch => {
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
      dispatch(signupSuccess());
    } else {
      response.json().then(res => dispatch(signupFailure(res)));
    }
  }).catch((err) => {
    err.json().then(res => dispatch(signupFailure(res)));
  });
};
