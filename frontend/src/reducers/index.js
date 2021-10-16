import { combineReducers } from "redux";

// Import Reducers
import navigation from "./navigation";
import signup from "./signup";
import auth from "./auth";
import profile from "./profile";
import forum from "./forum";

const rootReducer = combineReducers({
  navigation,
  signup,
  auth,
  profile,
  forum,
});

export default rootReducer;
