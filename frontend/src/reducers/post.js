//Import constants
import {
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_FAILURE,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPVOTE_POST_SUCCESS,
  UPVOTE_POST_FAILURE,
  DOWNVOTE_POST_SUCCESS,
  DOWNVOTE_POST_FAILURE,
  SELECT_TOPIC,
} from "../constants/ReduxConstants.js";

const defaultState = {
  getPostsSuccess: false,
  getPostsFailure: false,
  getSinglePostSuccess: false,
  getSinglePostFailure: false,
  createPostSuccess: false,
  createPostFailure: false,
  upvotePostSuccess: false,
  upvotePostFailure: false,
  downvotePostSuccess: false,
  downvotePostFailure: false,
  forumTopic: "",
  posts: [],
  singlePost: {},
};

function postReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        getPostsSuccess: true,
        getPostsFailure: false,
        createPostSuccess: false,
        createPostFailure: false,
        forumTopic: action.topic,
        posts: action.posts,
      };
    case GET_ALL_POSTS_FAILURE:
      return {
        ...state,
        getPostsSuccess: false,
        getPostsFailure: true,
        forumTopic: "",
        posts: [],
      };
    case GET_SINGLE_POST_SUCCESS:
      return {
        ...state,
        getSinglePostSuccess: true,
        getSinglePostFailure: false,
        getPostsSuccess: false,
        getPostsFailure: false,
        singlePost: action.post,
      };
    case GET_SINGLE_POST_FAILURE:
      return {
        ...state,
        getSinglePostSuccess: false,
        getSinglePostFailure: true,
        singlePost: {},
      };
    case SELECT_TOPIC:
      return {
        ...state,
        forumTopic: action.topic,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        createPostSuccess: true,
        createPostFailure: false,
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        createPostSuccess: false,
        createPostFailure: true,
      };
    case UPVOTE_POST_SUCCESS:
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
    case DOWNVOTE_POST_SUCCESS:
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
    default:
      return state;
  }
}

export default postReducer;
