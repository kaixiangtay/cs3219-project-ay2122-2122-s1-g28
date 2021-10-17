import { combineReducers } from "redux";

// Import Reducers
import navigation from "./navigation";
import signup from "./signup";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import comment from "./comment";

const rootReducer = combineReducers({
  navigation,
  signup,
  auth,
  profile,
  post,
  comment,
});

export default rootReducer;
