// Import constants
import {
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_FAILURE,
} from "../constants/ReduxConstants";

// ===================================================================
// CREATE COMMENT STATE CHANGE
// ===================================================================
const createCommentSuccess = () => {
  return {
    type: CREATE_COMMENT_SUCCESS,
  };
};

const createCommentFailure = () => {
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

const getAllCommentsFailure = () => {
  return {
    type: GET_ALL_COMMENTS_FAILURE,
  };
};

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
          response.json().then(() => dispatch(createCommentSuccess()));
        } else {
          response.json().then(() => {
            dispatch(createCommentFailure());
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
      } else {
        response.json().then(() => {
          dispatch(getAllCommentsFailure());
        });
      }
    })
    .catch((err) => {
      dispatch(getAllCommentsFailure(err));
    });
};
