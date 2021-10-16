// Import constants
import {
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_FAILURE,
  CREATE_POST_SUCESS,
  CREATE_POST_FAILURE,
  UPVOTE_POST_SUCESS,
  UPVOTE_POST_FAILURE,
  DOWNVOTE_POST_SUCESS,
  DOWNVOTE_POST_FAILURE,
  CREATE_COMMENT_SUCESS,
  CREATE_COMMENT_FAILURE,
} from "../constants/ReduxConstants.js";

// ===================================================================
// GET ALL POSTS STATE CHANGE
// ===================================================================
const getAllPostsSuccess = (props, path, topic, posts) => {
  props.history.push(path);
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
const getSinglePostSuccess = (props, path, post) => {
  props.history.push(path);
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
// CREATE POST STATE CHANGE
// ===================================================================
const createPostSucess = (post) => {
  return {
    type: CREATE_POST_SUCESS,
    post: post,
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
    type: UPVOTE_POST_SUCESS,
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
    type: DOWNVOTE_POST_SUCESS,
  };
};

const downvotePostFailure = () => {
  return {
    type: DOWNVOTE_POST_FAILURE,
  };
};

// ===================================================================
// CREATE COMMENT STATE CHANGE
// ===================================================================
const createCommentSuccess = () => {
  return {
    type: CREATE_COMMENT_SUCESS,
  };
};

const createCommentFailure = () => {
  return {
    type: CREATE_COMMENT_FAILURE,
  };
};

// ===================================================================
// HANDLING API CALLS
// ===================================================================

// Get all forum posts of a topic
export const handleForumSelection = (props, topic) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/forum/viewAllPosts/${topic}`;

  fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        const path = "/forum/" + topic.toLowerCase();
        response
          .json()
          .then((res) =>
            dispatch(getAllPostsSuccess(props, path, topic, res.posts))
          );
      } else {
        response.json().then(() => dispatch(getAllPostsFailure()));
      }
    })
    .catch((err) => {
      dispatch(getAllPostsFailure(err));
    });
};

// Create a post
export const handleCreatePost = (postData) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/forum/createPost`;
  const newPost = {
    // userName: auth.user.userName,
    topic: postData.topic,
    title: postData.title,
    content: postData.content,
  };

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: `Bearer ${token}`,
    },
    body: new URLSearchParams(newPost),
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then((res) => dispatch(createPostSucess(res)));
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

// Get a single forum post
export const handlePostSelection = (props, postData) => (dispatch) => {
  const postId = postData.postId;
  const topic = postData.topic;
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/forum/viewPost/${postId}`;

  fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      if (response.ok) {
        const path = "./forum/" + topic + "/" + postId;
        response
          .json()
          .then((res) => dispatch(getSinglePostSuccess(props, path, res.post)));
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

// Create a comment
export const handleCreateComment = (comment, postId) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/forum/createComment/${postId}`;
  const commentData = {
    // userName: auth.user.userName
    content: comment,
  };

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: `Bearer ${cookies.get("token")}`,
    },
    body: JSON.stringify(commentData),
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

// Upvote a post
export const handleUpvotePost = (postId) => (dispatch) => {
  console.log("test");
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/forum/upvotePost/${postId}`;

  fetch(requestUrl, {
    method: "PATCH",
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then(() => dispatch(upvotePostSuccess()));
      } else {
        response.json().then(() => dispatch(upvotePostFailure()));
      }
    })
    .catch(() => {
      dispatch(upvotePostFailure());
    });
};

// Downvote a post
export const handleDownvotePost = (postId) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL}/api/forum/downvotePost/${postId}`;

  fetch(requestUrl, {
    method: "PATCH",
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then(() => dispatch(downvotePostSuccess()));
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
