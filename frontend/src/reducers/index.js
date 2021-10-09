import { combineReducers } from "redux";
import auth from "./auth";
import signup from "./signup"; 
import navigation from "./navigation";

const rootReducer = combineReducers({
  auth,
  signup,
  navigation
});

export default rootReducer;
