// Import tokenExpire to update if token expired
// import { tokenExpire } from "./auth.js";

// Import Constants
import {
  MATCHING,
  MATCHED_SUCCESS,
  //   MATCHED_FAILURE,
  UNMATCHED_SUCCESS,
  //   UNMATCHED_FAILURE,
  UPDATE_INTEREST_GENDER,
  UPDATE_INTEREST_SPORT,
  UPDATE_INTEREST_ART,
  UPDATE_INTEREST_MUSIC,
  UPDATE_INTEREST_FACULTY,
  RESET,
} from "../constants/ReduxConstants";

import {
  GENDER,
  SPORT,
  ART,
  MUSIC,
  FACULTY,
} from "../constants/FindFriendsConstants";

// ===================================================================
// MATCH STATE CHANGE
// ===================================================================

const matching = () => {
  return {
    type: MATCHING,
  };
};

const matchedSuccess = (_payload) => {
  return {
    type: MATCHED_SUCCESS,
    payload: _payload.data,
  };
};

// const matchedFailure = (err) => {
//   toast.error(err.msg, {
//     position: toast.POSITION.TOP_RIGHT,
//   });
//   return {
//     type: MATCHED_FAILURE,
//   };
// };

const unmatchedSuccess = () => {
  return {
    type: UNMATCHED_SUCCESS,
  };
};

// const unmatchedFailure = (err) => {
//   toast.error(err.msg, {
//     position: toast.POSITION.TOP_RIGHT,
//   });
//   return {
//     type: MATCHED_FAILURE,
//   };
// };

const updateGender = (_payload) => {
  return {
    type: UPDATE_INTEREST_GENDER,
    payload: _payload,
  };
};

const updateSport = (_payload) => {
  return {
    type: UPDATE_INTEREST_SPORT,
    payload: _payload,
  };
};

const updateArt = (_payload) => {
  return {
    type: UPDATE_INTEREST_ART,
    payload: _payload,
  };
};

const updateMusic = (_payload) => {
  return {
    type: UPDATE_INTEREST_MUSIC,
    payload: _payload,
  };
};

const updateFaculty = (_payload) => {
  return {
    type: UPDATE_INTEREST_FACULTY,
    payload: _payload,
  };
};

export const resetInterests = () => {
  return {
    type: RESET,
  };
};

// ===================================================================
// HANDLING UPDATING OF INTERESTS
// ===================================================================

export const updateInterests = (category, items) => (dispatch) => {
  switch (category) {
    case GENDER:
      dispatch(updateGender(items));
      break;
    case SPORT:
      dispatch(updateSport(items));
      break;
    case ART:
      dispatch(updateArt(items));
      break;
    case MUSIC:
      dispatch(updateMusic(items));
      break;
    case FACULTY:
      dispatch(updateFaculty(items));
      break;
    default:
      return;
  }
};

// ===================================================================
// HANDLING API CALLS
// ===================================================================

// Temporary harcoded solution
export const handleMatch = () => (dispatch) => {
  dispatch(matching());
  setTimeout(
    () =>
      dispatch(
        matchedSuccess({
          matchedPersonId: 12345,
        })
      ),
    3000
  );
};

// Temporary harcoded solution
export const handleUnmatch = () => (dispatch) => {
  dispatch(unmatchedSuccess());
};
