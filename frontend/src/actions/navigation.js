// Import constants
import {
  FINDFRIENDS,
  FORUM,
  PROFILE,
  LOGOUT,
  RESET,
} from "../constants/ReduxConstants.js";

// ===================================================================
// Navigation State Change
// ===================================================================

const findfriends = () => {
  return {
    type: FINDFRIENDS,
  };
};

const forum = () => {
  return {
    type: FORUM,
  };
};

const profile = () => {
  return {
    type: PROFILE,
  };
};

const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const navigationReset = () => {
  return {
    type: RESET,
  };
};

// ===================================================================
// HANDLING API CALLS
// ===================================================================

// Handle user sign up
export const handleNavigation = (selection) => (dispatch) => {
  switch (selection) {
    case FINDFRIENDS:
      dispatch(findfriends());
      break;
    case FORUM:
      dispatch(forum());
      break;
    case PROFILE:
      dispatch(profile());
      break;
    case LOGOUT:
      dispatch(logout());
      break;
    default:
      dispatch(findfriends());
  }
};
