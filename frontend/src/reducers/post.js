//Import constants
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
  SORT_POSTS_SUCCESS,
  SORT_POSTS_FAILURE,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
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
  sortPostsSuccess: false,
  sortPostsFailure: false,
  getUserPostsSuccess: false,
  getUserPostsFailure: false,
  deletePostSuccess: false,
  deletePostFailure: false,
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
    case SORT_POSTS_SUCCESS:
      return {
        ...state,
        sortPostsSuccess: true,
        sortPostsFailure: false,
        createPostSuccess: false,
        createPostFailure: false,
        getUserPostsSuccess: false,
        getUserPostsFailure: false,
        posts: action.posts,
      };
    case SORT_POSTS_FAILURE:
      return {
        ...state,
        sortPostsSuccess: false,
        sortPostsFailure: true,
        createPostSuccess: false,
        createPostFailure: false,
      };
    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        getUserPostsSuccess: true,
        getUserPostsFailure: false,
        deletePostSuccess: false,
        deletePostFailure: false,
        posts: action.posts,
      };
    case GET_USER_POSTS_FAILURE:
      return {
        ...state,
        getUserPostsSuccess: false,
        getUserPostsFailure: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deletePostSuccess: true,
        deletePostFailure: false,
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        deletePostSuccess: false,
        deletePostFailure: true,
      };
    default:
      return state;
  }
}

export default postReducer;
