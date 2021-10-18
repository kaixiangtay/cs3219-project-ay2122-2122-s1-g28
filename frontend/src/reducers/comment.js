// Import Constants
import {
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_FAILURE,
} from "../constants/ReduxConstants.js";

const defaultState = {
  createCommentSuccess: false,
  createCommentFailure: false,
  getAllCommentsSuccess: false,
  getAllCommentsFailure: true,
  comments: [],
};

function commentReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        createCommentSuccess: true,
        createCommentFailure: false,
      };
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        createCommentSuccess: false,
        createCommentFailure: true,
      };
    case GET_ALL_COMMENTS_SUCCESS:
      return {
        ...state,
        getAllCommentsSuccess: true,
        getAllCommentsFailure: false,
        comments: action.comments,
      };
    case GET_ALL_COMMENTS_FAILURE:
      return {
        ...state,
        getAllCommentsSuccess: false,
        getAllCommentsFailure: true,
        comments: [],
      };
    default:
      return state;
  }
}

export default commentReducer;
