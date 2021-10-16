//Import constants
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

const defaultState = {
  getPostsSuccess: false,
  getPostsFailure: false,
  getSinglePostSuccess: false,
  getSinglePostFailure: false,
  createPostSucess: false,
  createPostFailure: false,
  upvotePostSuccess: false,
  upvotePostFailure: false,
  downvotePostSuccess: false,
  downvotePostFailure: false,
  createCommentSuccess: false,
  createCommentFailure: false,
  forumTopic: "",
  posts: {},
  singlePost: {},
};

function forumReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        getPostsSuccess: true,
        getPostsFailure: false,
        forumTopic: action.topic,
        posts: action.posts,
      };
    case GET_ALL_POSTS_FAILURE:
      return {
        ...state,
        getPostsSuccess: false,
        getPostsFailure: true,
        forumTopic: "",
        posts: {},
      };
    case GET_SINGLE_POST_SUCCESS:
      return {
        ...state,
        getSinglePostSuccess: true,
        getSinglePostFailure: false,
        singlePost: action.post,
      };
    case GET_SINGLE_POST_FAILURE:
      return {
        ...state,
        getSinglePostSuccess: false,
        getSinglePostFailure: true,
        singlePost: {},
      };
    case CREATE_POST_SUCESS:
      return {
        ...state,
        createPostSucess: true,
        createPostFailure: false,
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        createPostSucess: false,
        createPostFailure: true,
      };
    case UPVOTE_POST_SUCESS:
      return {
        ...state,
        upvotePostSuccess: true,
        upvotePostFailure: false,
      };
    case UPVOTE_POST_FAILURE:
      return {
        ...state,
        upvotePostSuccess: false,
        upvotePostFailure: true,
      };
    case DOWNVOTE_POST_SUCESS:
      return {
        ...state,
        downvotePostSuccess: true,
        downvotePostFailure: false,
      };
    case DOWNVOTE_POST_FAILURE:
      return {
        ...state,
        downvotePostSuccess: false,
        downvotePostFailure: true,
      };
    case CREATE_COMMENT_SUCESS:
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
    default:
      return state;
  }
}

export default forumReducer;
