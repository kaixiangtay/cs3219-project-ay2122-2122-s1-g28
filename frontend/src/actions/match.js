import { toast } from "react-toastify";

// Import Socketio
import io from "socket.io-client";

// Import tokenExpire to update if token expired
import { tokenExpire } from "./auth.js";

// Import Constants
import {
  MATCHING,
  MATCHED_SUCCESS,
  MATCHED_FAILURE,
  UNMATCHED_SUCCESS,
  UNMATCHED_FAILURE,
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

const matchedFailure = (err) => {
  toast.error(err.msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
  return {
    type: MATCHED_FAILURE,
  };
};

const unmatchedSuccess = () => {
  return {
    type: UNMATCHED_SUCCESS,
  };
};

const unmatchedFailure = () => {
  return {
    type: UNMATCHED_FAILURE,
  };
};

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
// HANDLING SOCKET CLIENT FUNCTIONS
// ===================================================================

export let socket;

export const initiateSocket = (roomId) => {
  socket = io(`${process.env.REACT_APP_API_URL_CHAT}`, {
    path: "/api/chat/socket.io",
  });

  console.log(`Connecting socket...`);

  if (socket && roomId) {
    socket.emit("join", roomId);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("Disconnecting socket...");
    socket.emit("leave", true);
    socket.disconnect();
  }
  return true;
};

export const sendMessage = (roomId, token, message) => {
  if (socket) {
    socket.emit("chat", { roomId, token, message });
  }
};

// ===================================================================
// HANDLING API CALLS
// ===================================================================

// Handles matching between users
export const handleMatchWithRetry =
  (token, _interests, numRetries = 10) =>
  (dispatch) => {
    const requestUrl = `${process.env.REACT_APP_API_URL_FINDFRIEND}/api/findfriend/createMatch`;

    dispatch(matching());

    fetch(requestUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interests: _interests,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((res) => dispatch(matchedSuccess(res)));
        } else if (response.status == 401) {
          dispatch(tokenExpire());
        } else {
          if (numRetries > 0) {
            setTimeout(() => {
              dispatch(handleMatchWithRetry(token, _interests, numRetries - 1));
            }, 3000);
          } else {
            dispatch(
              matchedFailure({ msg: "No suitable match found at the moment" })
            );
          }
        }
      })
      .catch(() => {
        dispatch(tokenExpire());
      });
  };

// Unmatches user from other party
export const handleUnmatch = (token) => (dispatch) => {
  const requestUrl = `${process.env.REACT_APP_API_URL_FINDFRIEND}/api/findfriend/clearMatch`;
  disconnectSocket();

  fetch(requestUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        dispatch(unmatchedSuccess());
      } else if (response.status == 401) {
        dispatch(tokenExpire());
      } else {
        dispatch(unmatchedFailure());
      }
    })
    .catch(() => {
      dispatch(tokenExpire());
    });
};

// When the other party disconnects
export const handleMatchDisconnect = () => (dispatch) => {
  disconnectSocket();
  dispatch(unmatchedSuccess());
};
