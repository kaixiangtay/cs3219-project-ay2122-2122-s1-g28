import { combineReducers } from "redux";

// Import Reducers
import navigation from "./navigation";
import signup from "./signup";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import comment from "./comment";
import match from "./match";

const rootReducer = combineReducers({
  navigation,
  signup,
  auth,
  profile,
  post,
  comment,
  match,
});

export default rootReducer;
