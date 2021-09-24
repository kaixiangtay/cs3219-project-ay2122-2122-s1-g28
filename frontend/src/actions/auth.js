import { toast } from "react-toastify";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

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

// Handle user login 
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
