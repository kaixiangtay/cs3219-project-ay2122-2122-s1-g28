import { toast } from "react-toastify";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE"; 

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginFailure = () => {
  toast.error("Incorrect username or password. Please try again!", {
    position: toast.POSITION.TOP_RIGHT
  });
  return {
    type: LOGIN_FAILURE
  };
};

const logoutRequest = () => { 
  return { 
    type: LOGOUT_REQUEST
  };
}; 

const logoutSuccess = (props) => {
  props.history.push('/login');
  return { 
    type: LOGOUT_SUCCESS
  };
}; 

const logoutFailure = () => { 
  return { 
    type: LOGOUT_FAILURE
  };
}; 

export const loginUser = (email, password) => dispatch => {
  const requestUrl = ``;
  let userData = { email, password };

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      dispatch(loginRequest()); 
      response.json().then(user => {
        if (response.status === 200) {
          dispatch(loginSuccess(user));
        } else {
          dispatch(loginFailure());
        }
      });
    })
    .catch(() => {
      dispatch(loginFailure());
    });
};

export const logoutUser = (props) => dispatch => { 
  dispatch(logoutRequest());
  try { 
    //Remove auth token here, if successful, dispatch logoutSuccess 
    dispatch(logoutSuccess(props));
  } catch(err) {
    dispatch(logoutFailure());
  }
}; 
