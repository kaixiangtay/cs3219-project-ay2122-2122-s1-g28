import { toast } from "react-toastify";

// Import Constants
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  PROFILE_RETRIEVE_SUCCESS,
  PROFILE_RETRIEVE_FAILURE,
} from "../constants/ReduxConstants";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const loginFailure = () => {
  toast.error("Incorrect username or password. Please try again!", {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: LOGIN_FAILURE,
  };
};

const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
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

const profileRetrieveSuccess = (_payload) => {
  return {
    type: PROFILE_RETRIEVE_SUCCESS,
    payload: _payload.data,
  };
};

const profileRetrieveFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: PROFILE_RETRIEVE_FAILURE,
  };
};

// Handle user login
export const loginUser = (email, password) => (dispatch) => {
  const requestUrl = ``;
  let userData = { email, password };

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      dispatch(loginRequest());
      response.json().then((user) => {
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

export const logoutUser = () => (dispatch) => {
  dispatch(logoutRequest());
  try {
    //Remove auth token here, if successful, dispatch logoutSuccess
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
};

// Handle retrieve Profile Information
export const handleProfileRetrieval = (_id) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/users/${_id}`;

  fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => dispatch(profileRetrieveSuccess(res)));
      } else {
        response.json().then((res) => dispatch(profileRetrieveFailure(res)));
      }
    })
    .catch((err) => {
      alert(err);
    });
};
