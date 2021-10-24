import { toast } from "react-toastify";

// Import tokenExpire to update if token expired
import { tokenExpire } from "./auth.js";

// Import constants
import {
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_FAILURE,
  GET_USER_COMMENTS_SUCCESS,
  GET_USER_COMMENTS_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "../constants/ReduxConstants";

// ===================================================================
// CREATE COMMENT STATE CHANGE
// ===================================================================
const createCommentSuccess = (res) => {
  toast.success(res.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: CREATE_COMMENT_SUCCESS,
  };
};

const createCommentFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: CREATE_COMMENT_FAILURE,
  };
};

// ===================================================================
// GET ALL COMMENTS STATE CHANGE
// ===================================================================
const getAllCommentsSuccess = (comments) => {
  return {
    type: GET_ALL_COMMENTS_SUCCESS,
    comments: comments,
  };
};

const getAllCommentsFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: GET_ALL_COMMENTS_FAILURE,
  };
};

// ===================================================================
// GET USER'S COMMENTS
// ===================================================================
const getUserCommentsSuccess = (comments) => {
  return {
    type: GET_USER_COMMENTS_SUCCESS,
    comments: comments,
  };
};

const getUserCommentsFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: GET_USER_COMMENTS_FAILURE,
  };
};

// ===================================================================
// DELETE COMMENTS
// ===================================================================
const deleteCommentSuccess = (res) => {
  toast.success(res.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: DELETE_COMMENT_SUCCESS,
  };
};

const deleteCommentFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: DELETE_COMMENT_FAILURE,
  };
};

// ===================================================================
// HANDLE API CALLS
// ===================================================================
// Create a comment
export const handleCreateComment =
  (comment, postId) => (dispatch, getState) => {
    const token = getState().auth.token;
    const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/createComment/${postId}`;
    const commentData = {
      userName: getState().profile.data.name,
      content: comment,
    };

    fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams(commentData),
    })
      .then(function (response) {
        if (response.ok) {
          response.json().then((res) => dispatch(createCommentSuccess(res)));
        } else if (response.status == 401) {
          dispatch(tokenExpire());
        } else {
          response.json().then((err) => {
            dispatch(createCommentFailure(err));
          });
        }
      })
      .catch((err) => {
        dispatch(createCommentFailure(err));
      });
  };

// Get all comments of a post
export const handleGetAllComments = (postId) => (dispatch, getState) => {
  const token = getState().auth.token;
  const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/viewAllComments/${postId}`;

  fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      if (response.ok) {
        response
          .json()
          .then((res) => dispatch(getAllCommentsSuccess(res.data)));
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then((err) => {
          dispatch(getAllCommentsFailure(err));
        });
      }
    })
    .catch((err) => {
      dispatch(getAllCommentsFailure(err));
    });
};

// Get user's comments
export const handleGetUserComments = (topic) => (dispatch, getState) => {
  const token = getState().auth.token;
  const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/viewUserComments/${topic}`;

  fetch(requestUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        response
          .json()
          .then((res) => dispatch(getUserCommentsSuccess(res.data)));
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then((err) => dispatch(getUserCommentsFailure(err)));
      }
    })
    .catch((err) => {
      dispatch(getUserCommentsFailure(err));
    });
};

// Delete comment
export const handleDeleteComment =
  (commentId, postId) => (dispatch, getState) => {
    const token = getState().auth.token;
    const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/deleteComment/${postId}/${commentId}`;

    fetch(requestUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((res) => dispatch(deleteCommentSuccess(res)));
        } else if (response.status == 401) {
          dispatch(tokenExpire());
        } else {
          response.json().then((err) => dispatch(deleteCommentFailure(err)));
        }
      })
      .catch((err) => {
        dispatch(deleteCommentFailure(err));
      });
  };
