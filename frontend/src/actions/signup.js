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
    name: userData.name,
    email: userData.email, 
    password: userData.password 
  }; 
  const requestUrl = `${process.env.API_URL}/api/users/signup`;

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": `${process.env.API_CONTENT_TYPE}`
    },
    body: new URLSearchParams({
      name: newUserData.name,
      email: newUserData.email,
      password: newUserData.password
    })
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
