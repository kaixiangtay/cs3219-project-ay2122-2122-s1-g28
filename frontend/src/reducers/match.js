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

const defaultState = {
  matching: false,
  matchedSuccess: false,
  matchedFailure: false,
  unmatchedSuccess: false,
  unmatchedFailure: false,
  interests: {
    gender: [],
    art: [],
    music: [],
    sport: [],
    faculty: [],
  },
  data: {
    roomId: null,
  },
};

export default function matchReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_INTEREST_GENDER:
      return {
        ...state,
        interests: {
          gender: action.payload,
          art: state.interests.art,
          music: state.interests.music,
          sport: state.interests.sport,
          faculty: state.interests.faculty,
        },
      };
    case UPDATE_INTEREST_SPORT:
      return {
        ...state,
        interests: {
          gender: state.interests.gender,
          art: state.interests.art,
          music: state.interests.music,
          sport: action.payload,
          faculty: state.interests.faculty,
        },
      };
    case UPDATE_INTEREST_ART:
      return {
        ...state,
        interests: {
          gender: state.interests.gender,
          art: action.payload,
          music: state.interests.music,
          sport: state.interests.sport,
          faculty: state.interests.faculty,
        },
      };
    case UPDATE_INTEREST_MUSIC:
      return {
        ...state,
        interests: {
          gender: state.interests.gender,
          art: state.interests.art,
          music: action.payload,
          sport: state.interests.sport,
          faculty: state.interests.faculty,
        },
      };
    case UPDATE_INTEREST_FACULTY:
      return {
        ...state,
        interests: {
          gender: state.interests.gender,
          art: state.data.art,
          music: state.interests.music,
          sport: state.interests.sport,
          faculty: action.payload,
        },
      };
    case MATCHING:
      return {
        ...state,
        matching: true,
      };
    case MATCHED_SUCCESS:
      return {
        ...state,
        matching: false,
        matchedSuccess: true,
        data: action.payload,
      };
    case MATCHED_FAILURE:
      return {
        ...state,
        matching: false,
        matchedFailure: true,
      };
    case UNMATCHED_SUCCESS:
      return {
        ...state,
        matching: false,
        matchedSuccess: false,
        unmatchedSuccess: true,
        data: {},
      };
    case UNMATCHED_FAILURE:
      return {
        ...state,
        matching: false,
        matchedSuccess: false,
        unmatchedFailure: true,
        data: {},
      };
    case RESET:
      return defaultState;
    default:
      return state;
  }
}
