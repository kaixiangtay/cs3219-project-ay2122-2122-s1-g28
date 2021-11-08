import { toast } from "react-toastify";

// Import tokenExpire to update if token expired
import { tokenExpire } from "./auth.js";

// Import constants
import {
  SELECT_TOPIC,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_FAILURE,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPVOTE_POST_SUCCESS,
  UPVOTE_POST_FAILURE,
  DOWNVOTE_POST_SUCCESS,
  DOWNVOTE_POST_FAILURE,
  SORT_POSTS_SUCCESS,
  SORT_POSTS_FAILURE,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
} from "../constants/ReduxConstants.js";

// ===================================================================
// SELECT TOPIC
// ===================================================================
const selectTopic = (topic, history) => {
  const path = "/forum/" + topic.toLowerCase();
  history.push(path);
  return {
    type: SELECT_TOPIC,
    topic: topic,
  };
};

// ===================================================================
// GET A SINGLE POST
// ===================================================================
const getPostSuccess = (post) => {
  return {
    type: GET_SINGLE_POST_SUCCESS,
    singlePost: post,
  };
};

const getPostFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: GET_SINGLE_POST_FAILURE,
  };
};

// ===================================================================
// CREATE POST
// ===================================================================
const createPostSuccess = (res) => {
  toast.success(res.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: CREATE_POST_SUCCESS,
  };
};

const createPostFailure = (err) => {
  for (var i = 0; i < err.length; i++) {
    toast.error(err[i].msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return {
    type: CREATE_POST_FAILURE,
  };
};

// ===================================================================
// UPVOTE POST
// ===================================================================
const upvotePostSuccess = () => {
  return {
    type: UPVOTE_POST_SUCCESS,
  };
};

const upvotePostFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: UPVOTE_POST_FAILURE,
  };
};

// ===================================================================
// DOWNVOTE POST
// ===================================================================
const downvotePostSuccess = () => {
  return {
    type: DOWNVOTE_POST_SUCCESS,
  };
};

const downvotePostFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: DOWNVOTE_POST_FAILURE,
  };
};

// ===================================================================
// SORT POST
// ===================================================================
const sortPostsSuccess = (posts) => {
  return {
    type: SORT_POSTS_SUCCESS,
    posts: posts,
  };
};

const sortPostsFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: SORT_POSTS_FAILURE,
  };
};

// ===================================================================
// GET USER'S POSTS
// ===================================================================
const getUserPostsSuccess = (topic, posts, history) => {
  const path = "/forum/" + topic.toLowerCase() + "/manage-posts";
  history.push(path);
  return {
    type: GET_USER_POSTS_SUCCESS,
    posts: posts,
  };
};

const getUserPostsFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: GET_USER_POSTS_FAILURE,
  };
};

// ===================================================================
// DELETE POST
// ===================================================================
const deletePostSuccess = (res) => {
  toast.success(res.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: DELETE_POST_SUCCESS,
  };
};

const deletePostFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: DELETE_POST_FAILURE,
  };
};

// ===================================================================
// EDIT POST
// ===================================================================
const editPostSuccess = (res) => {
  toast.success(res.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: EDIT_POST_SUCCESS,
  };
};

const editPostFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: EDIT_POST_FAILURE,
  };
};

// ===================================================================
// HANDLE API CALLS
// ===================================================================
// Handle selection of a topic
export const handleTopicSelection = (topic, history) => (dispatch) => {
  dispatch(selectTopic(topic, history));
};

// Get a single forum post
export const handleGetSinglePost = (postId) => (dispatch, getState) => {
  const token = getState().auth.token;
  const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/viewPost/${postId}`;

  fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then((res) => dispatch(getPostSuccess(res.data)));
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then((res) => {
          dispatch(getPostFailure(res));
        });
      }
    })
    .catch((err) => {
      dispatch(getPostFailure(err));
    });
};

// Create a post
export const handleCreatePost = (postData) => (dispatch, getState) => {
  const token = getState().auth.token;
  const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/createPost`;
  const newPost = {
    name: getState().profile.data.name,
    topic: postData.topic,
    title: postData.title,
    content: postData.content,
  };

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: new URLSearchParams(newPost),
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then((res) => dispatch(createPostSuccess(res)));
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then((res) => {
          dispatch(createPostFailure(res));
        });
      }
    })
    .catch((err) => {
      dispatch(createPostFailure(err));
    });
};

// Upvote a post
export const handleUpvotePost = (postId) => (dispatch, getState) => {
  const token = getState().auth.token;
  const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/upvotePost/${postId}`;

  fetch(requestUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then(() => dispatch(upvotePostSuccess()));
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then((err) => dispatch(upvotePostFailure(err)));
      }
    })
    .catch((err) => {
      dispatch(upvotePostFailure(err));
    });
};

// Downvote a post
export const handleDownvotePost = (postId) => (dispatch, getState) => {
  const token = getState().auth.token;
  const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/downvotePost/${postId}`;

  fetch(requestUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then(() => dispatch(downvotePostSuccess()));
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then((err) => dispatch(downvotePostFailure(err)));
      }
    })
    .catch((err) => {
      dispatch(downvotePostFailure(err));
    });
};

// Sort posts
export const handleSortPost = (sortByValue, topic) => (dispatch, getState) => {
  const token = getState().auth.token;
  const requestUrl =
    sortByValue == "oldest"
      ? `${process.env.REACT_APP_API_URL_FORUM}/api/forum/sortPostByAscDate/${topic}`
      : sortByValue == "latest"
      ? `${process.env.REACT_APP_API_URL_FORUM}/api/forum/sortPostByDescDate/${topic}`
      : sortByValue == "ascVote"
      ? `${process.env.REACT_APP_API_URL_FORUM}/api/forum/sortPostByAscVotes/${topic}`
      : sortByValue == "descVote"
      ? `${process.env.REACT_APP_API_URL_FORUM}/api/forum/sortPostByDescVotes/${topic}`
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
        response.json().then((res) => dispatch(sortPostsSuccess(res.data)));
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then((err) => dispatch(sortPostsFailure(err)));
      }
    })
    .catch((err) => {
      dispatch(sortPostsFailure(err));
    });
};

// Get user's posts
export const handleGetUserPosts = (topic, history) => (dispatch, getState) => {
  const token = getState().auth.token;
  const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/viewUserPosts/${topic}`;

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
          .then((res) =>
            dispatch(getUserPostsSuccess(topic, res.data, history))
          );
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then((err) => dispatch(getUserPostsFailure(err)));
      }
    })
    .catch((err) => {
      dispatch(getUserPostsFailure(err));
    });
};

// Delete post
export const handleDeletePost = (postId) => (dispatch, getState) => {
  const token = getState().auth.token;
  const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/deletePost/${postId}`;

  fetch(requestUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => dispatch(deletePostSuccess(res)));
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then((err) => dispatch(deletePostFailure(err)));
      }
    })
    .catch((err) => {
      dispatch(deletePostFailure(err));
    });
};

// Edit post
export const handleEditPost =
  (postId, editedPostData) => (dispatch, getState) => {
    const token = getState().auth.token;
    const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/updatePost/${postId}`;

    fetch(requestUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams(editedPostData),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((res) => dispatch(editPostSuccess(res)));
        } else if (response.status == 401) {
          dispatch(tokenExpire());
        } else {
          response.json().then((err) => dispatch(editPostFailure(err)));
        }
      })
      .catch((err) => {
        dispatch(editPostFailure(err));
      });
  };
