import { toast } from "react-toastify";

// Import tokenExpire to update if token expired
import { tokenExpire } from "./auth.js";

// Import constants
import {
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  GET_USER_COMMENTS_SUCCESS,
  GET_USER_COMMENTS_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  SORT_COMMENTS_SUCCESS,
  SORT_COMMENTS_FAILURE,
  UPVOTE_COMMENT_SUCCESS,
  UPVOTE_COMMENT_FAILURE,
  DOWNVOTE_COMMENT_SUCCESS,
  DOWNVOTE_COMMENT_FAILURE,
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
  for (var i = 0; i < err.length; i++) {
    toast.error(err[i].msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return {
    type: CREATE_COMMENT_FAILURE,
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
// EDIT COMMENT
// ===================================================================
const editCommentSuccess = (res) => {
  toast.success(res.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: EDIT_COMMENT_SUCCESS,
  };
};

const editCommentFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: EDIT_COMMENT_FAILURE,
  };
};

// ===================================================================
// SORT COMMENTS
// ===================================================================
const sortCommentsSuccess = (comments) => {
  return {
    type: SORT_COMMENTS_SUCCESS,
    comments: comments,
  };
};

const sortCommentsFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: SORT_COMMENTS_FAILURE,
  };
};

// ===================================================================
// UPVOTE COMMENT
// ===================================================================
const upvoteCommentSuccess = () => {
  return {
    type: UPVOTE_COMMENT_SUCCESS,
  };
};

const upvoteCommentFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: UPVOTE_COMMENT_FAILURE,
  };
};

// ===================================================================
// DOWNVOTE COMMENT
// ===================================================================
const downvoteCommentSuccess = () => {
  return {
    type: DOWNVOTE_COMMENT_SUCCESS,
  };
};

const downvoteCommentFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: DOWNVOTE_COMMENT_FAILURE,
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
      name: getState().profile.data.name,
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

// Edit comment
export const handleEditComment =
  (postId, editedComment) => (dispatch, getState) => {
    const commentId = editedComment.commentId;
    const token = getState().auth.token;
    const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/updateComment/${postId}/${commentId}`;

    fetch(requestUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(editedComment),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((res) => dispatch(editCommentSuccess(res)));
        } else if (response.status == 401) {
          dispatch(tokenExpire());
        } else {
          response.json().then((err) => dispatch(editCommentFailure(err)));
        }
      })
      .catch((err) => {
        dispatch(editCommentFailure(err));
      });
  };

// Sort comments
export const handleSortComments =
  (sortByValue, postId) => (dispatch, getState) => {
    const token = getState().auth.token;
    const requestUrl =
      sortByValue == "oldest"
        ? `${process.env.REACT_APP_API_URL_FORUM}/api/forum/sortCommentsByAscDate/${postId}`
        : sortByValue == "latest"
        ? `${process.env.REACT_APP_API_URL_FORUM}/api/forum/sortCommentsByDescDate/${postId}`
        : sortByValue == "ascVote"
        ? `${process.env.REACT_APP_API_URL_FORUM}/api/forum/sortCommentsByAscVotes/${postId}`
        : sortByValue == "descVote"
        ? `${process.env.REACT_APP_API_URL_FORUM}/api/forum/sortCommentsByDescVotes/${postId}`
        : ``;

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
            .then((res) => dispatch(sortCommentsSuccess(res.data)));
        } else if (response.status == 401) {
          dispatch(tokenExpire());
        } else {
          response.json().then((err) => dispatch(sortCommentsFailure(err)));
        }
      })
      .catch((err) => {
        dispatch(sortCommentsFailure(err));
      });
  };

// Upvote a comment
export const handleUpvoteComment =
  (postId, commentId) => (dispatch, getState) => {
    const token = getState().auth.token;
    const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/upvoteComment/${postId}/${commentId}`;

    fetch(requestUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(() => dispatch(upvoteCommentSuccess()));
        } else if (response.status == 401) {
          dispatch(tokenExpire());
        } else {
          response.json().then((err) => dispatch(upvoteCommentFailure(err)));
        }
      })
      .catch((err) => {
        dispatch(upvoteCommentFailure(err));
      });
  };

// Downvote a comment
export const handleDownvoteComment =
  (postId, commentId) => (dispatch, getState) => {
    const token = getState().auth.token;
    const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/downvoteComment/${postId}/${commentId}`;

    fetch(requestUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(() => dispatch(downvoteCommentSuccess()));
        } else if (response.status == 401) {
          dispatch(tokenExpire());
        } else {
          response.json().then((err) => dispatch(downvoteCommentFailure(err)));
        }
      })
      .catch((err) => {
        dispatch(downvoteCommentFailure(err));
      });
  };
