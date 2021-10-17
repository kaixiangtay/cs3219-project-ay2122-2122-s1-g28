// Import constants
import {
  CREATE_COMMENT_SUCESS,
  CREATE_COMMENT_FAILURE,
} from "../constants/ReduxConstants";

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
