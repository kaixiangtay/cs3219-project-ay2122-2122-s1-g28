import { toast } from "react-toastify";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

const signupSuccess = (props) => {
  // Go to login page upon successful signup 
  props.history.push('/login'); 
  return {
    type: SIGNUP_SUCCESS
  };
};

const signupFailure = () => {
  toast.error("Error signing up. Please try again!", {
    position: toast.POSITION.TOP_RIGHT
  });
  return {
    type: SIGNUP_FAILURE
  };
};

// Handle user sign up 
export const signupUser = (userData, props) => dispatch => {
  const newUserData = {
    email: userData.email, 
    username: userData.username,
    password: userData.password 
  }; 
  const requestUrl = ``;

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUserData)
  })
    .then(response => {
      if (response.status === 200) { 
        dispatch(signupSuccess(props));
      } else {
        dispatch(signupFailure()); 
      }
    })
    .catch(() => {
      dispatch(signupFailure());
    });
};
