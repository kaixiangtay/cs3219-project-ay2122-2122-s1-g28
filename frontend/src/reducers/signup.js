//Import constants
import { 
  SUCCESS, 
  FAILURE, 
  VERIFIED,
  RESET
} from '../constants/ReduxConstants.js';

const defaultState = {
  success: false,
  failure: false,
  verified: false,
  email: ''
};

function signupReducer(state = defaultState, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        success: true, 
        failure: false,
        verified: false,
        email: action.payload
      };
    case FAILURE:
      return {
        ...state,
        success: false,
        failure: true,
        verified: false,
        email: ''
      };
    case VERIFIED:
      return {
        ...state,
        success: false,
        failure: false,
        verified: action.payload,
        email: state.email
      };
    case RESET:
      return {
        ...state,
        success: false,
        failure: false,
        verified: false,
        email: ''
      };
    default:
      return state;
  }
};

export default signupReducer;