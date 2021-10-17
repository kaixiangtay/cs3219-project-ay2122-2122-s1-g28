// Import Constants
import {
  CREATE_COMMENT_SUCESS,
  CREATE_COMMENT_FAILURE,
} from "../constants/ReduxConstants.js";

const defaultState = {
  createCommentSuccess: false,
  createCommentFailure: false,
};

function commentReducer(state = defaultState, action) {
  switch (action.type) {
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

export default commentReducer;
