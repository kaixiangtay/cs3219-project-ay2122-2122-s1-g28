// Import constants
import {
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_FAILURE,
  SELECT_TOPIC,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPVOTE_POST_SUCCESS,
  UPVOTE_POST_FAILURE,
  DOWNVOTE_POST_SUCCESS,
  DOWNVOTE_POST_FAILURE,
} from "../constants/ReduxConstants.js";

// Import tokenExpire to update if token expired
import { tokenExpire } from "./auth.js";

// ===================================================================
// GET ALL POSTS STATE CHANGE
// ===================================================================
const getAllPostsSuccess = (topic, posts) => {
  return {
    type: GET_ALL_POSTS_SUCCESS,
    topic: topic,
    posts: posts,
  };
};

const getAllPostsFailure = () => {
  return {
    type: GET_ALL_POSTS_FAILURE,
  };
};

// ===================================================================
// GET SINGLE POST STATE CHANGE
// ===================================================================
const getSinglePostSuccess = (history, path, post) => {
  history.push(path);
  return {
    type: GET_SINGLE_POST_SUCCESS,
    post: post,
  };
};

const getSinglePostFailure = () => {
  return {
    type: GET_SINGLE_POST_FAILURE,
  };
};

// ===================================================================
// SELECT TOPIC STATE CHANGE
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
// CREATE POST STATE CHANGE
// ===================================================================
const createPostSuccess = () => {
  return {
    type: CREATE_POST_SUCCESS,
  };
};

const createPostFailure = () => {
  return {
    type: CREATE_POST_FAILURE,
  };
};

// ===================================================================
// UPVOTE POST STATE CHANGE
// ===================================================================
const upvotePostSuccess = () => {
  return {
    type: UPVOTE_POST_SUCCESS,
  };
};

const upvotePostFailure = () => {
  return {
    type: UPVOTE_POST_FAILURE,
  };
};

// ===================================================================
// DOWNVOTE POST STATE CHANGE
// ===================================================================
const downvotePostSuccess = () => {
  return {
    type: DOWNVOTE_POST_SUCCESS,
  };
};

const downvotePostFailure = () => {
  return {
    type: DOWNVOTE_POST_FAILURE,
  };
};

// ===================================================================
// HANDLING API CALLS
// ===================================================================

// Get all forum posts of a topic
export const handleForumSelection = (topic) => (dispatch, getState) => {
  const token = getState().auth.token;
  const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/viewAllPosts/${topic}`;

  fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        response
          .json()
          .then((res) => dispatch(getAllPostsSuccess(topic, res.data)));
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then(() => dispatch(getAllPostsFailure()));
      }
    })
    .catch((err) => {
      dispatch(getAllPostsFailure(err));
    });
};

// Get a single forum post
export const handlePostSelection =
  (history, postData) => (dispatch, getState) => {
    const postId = postData.postId;
    const topic = postData.topic;
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
          const path = topic.toLowerCase() + "/" + postId;
          response
            .json()
            .then((res) =>
              dispatch(getSinglePostSuccess(history, path, res.data))
            );
        } else if (response.status == 401) {
          dispatch(tokenExpire());
        } else {
          response.json().then(() => {
            dispatch(getSinglePostFailure());
          });
        }
      })
      .catch((err) => {
        dispatch(getSinglePostFailure(err));
      });
  };

// Handle selection of a topic
export const handleTopicSelection = (topic, history) => (dispatch) => {
  dispatch(selectTopic(topic, history));
};

// Create a post
export const handleCreatePost = (postData) => (dispatch, getState) => {
  const token = getState().auth.token;
  const requestUrl = `${process.env.REACT_APP_API_URL_FORUM}/api/forum/createPost`;
  const newPost = {
    userName: getState().profile.data.name,
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
        response.json().then(() => dispatch(createPostSuccess()));
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        response.json().then(() => {
          dispatch(createPostFailure());
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
        response.json().then(() => dispatch(upvotePostFailure()));
      }
    })
    .catch(() => {
      dispatch(upvotePostFailure());
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
        response.json().then(() => dispatch(downvotePostFailure()));
      }
    })
    .catch(() => {
      dispatch(downvotePostFailure());
    });
};

// Sort posts
// export const handlePostSorting = (sortByValue, topic) => (dispatch) => {
//   const requestUrl =
//     sortByValue == "newest"
//       ? `${process.env.REACT_APP_API_URL}/api/forum/sortPostByAscDate/${topic}`
//       : sortByValue == "oldest"
//       ? `${process.env.REACT_APP_API_URL}/api/forum/sortPostByDescDate/${topic}`
//       : sortByValue == "ascVote"
//       ? `${process.env.REACT_APP_API_URL}/api/forum/sortPostByAscVotes/${topic}`
//       : sortByValue == "descVote"
//       ? `${process.env.REACT_APP_API_URL}/api/forum/sortPostByDescVotes/${topic}`
//       : ``;
//   fetch(requestUrl, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         response.json();
//         // .then((res) => dispatch(selectionSuccess(path, topic, res.posts)));
//       } else {
//         response.json().then(() => dispatch(selectionFailure()));
//       }
//     })
//     .catch((err) => {
//       dispatch(selectionFailure(err));
//     });
// };
