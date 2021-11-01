// Import Constants
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
} from "../constants/ReduxConstants.js";

const defaultState = {
  createCommentSuccess: false,
  createCommentFailure: false,
  getUserCommentsSuccess: false,
  getUserCommentsFailure: false,
  deleteCommentSuccess: false,
  deleteCommentFailure: false,
  editCommentSuccess: false,
  editCommentFailure: false,
  sortCommentsSuccess: false,
  sortCommentsFailure: false,
  upvoteCommentSuccess: false,
  upvoteCommentFailure: false,
  downvoteCommentSuccess: false,
  downvoteCommentFailure: false,
  comments: [],
  userComments: [],
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
    case GET_USER_COMMENTS_SUCCESS:
      return {
        ...state,
        getUserCommentsSuccess: true,
        getUserCommentsFailure: false,
        deleteCommentSuccess: false,
        deleteCommentFailure: false,
        editCommentSuccess: false,
        editCommentFailure: false,
        userComments: action.comments,
      };
    case GET_USER_COMMENTS_FAILURE:
      return {
        ...state,
        getUserCommentsSuccess: false,
        getUserCommentsFailure: true,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        deleteCommentSuccess: true,
        deleteCommentFailure: false,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        deleteCommentSuccess: false,
        deleteCommentFailure: true,
      };
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        editCommentSuccess: true,
        editCommentFailure: false,
      };
    case EDIT_COMMENT_FAILURE:
      return {
        ...state,
        editCommentSuccess: false,
        editCommentFailure: true,
      };
    case SORT_COMMENTS_SUCCESS:
      return {
        ...state,
        sortCommentsSuccess: true,
        sortCommentsFailure: false,
        createCommentSuccess: false,
        createCommentFailure: false,
        upvoteCommentSuccess: false,
        upvoteCommentFailure: false,
        downvoteCommentSuccess: false,
        downvoteCommentFailure: false,
        comments: action.comments,
      };
    case SORT_COMMENTS_FAILURE:
      return {
        ...state,
        sortCommentsSuccess: false,
        sortCommentsFailure: false,
      };
    case UPVOTE_COMMENT_SUCCESS:
      return {
        ...state,
        upvoteCommentSuccess: true,
        upvoteCommentFailure: false,
        sortCommentsSuccess: false,
        sortCommentsFailure: false,
      };
    case UPVOTE_COMMENT_FAILURE:
      return {
        ...state,
        upvoteCommentSuccess: false,
        upvoteCommentFailure: true,
      };
    case DOWNVOTE_COMMENT_SUCCESS:
      return {
        ...state,
        downvoteCommentSuccess: true,
        downvoteCommentFailure: false,
        sortCommentsSuccess: false,
        sortCommentsFailure: false,
      };
    case DOWNVOTE_COMMENT_FAILURE:
      return {
        ...state,
        downvoteCommentSuccess: false,
        downvoteCommentFailure: true,
      };
    default:
      return state;
  }
}

export default commentReducer;
