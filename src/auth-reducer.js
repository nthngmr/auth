import _ from 'lodash';
import {
  HANDLE_SIGNED_IN, 
  HANDLE_SIGNED_OUT, 
  HANDLE_SIGNING_OUT,
  SIGN_IN_WITH_GOOGLE, 
  HANDLE_SIGN_IN_FAILURE,
  TOGGLE_SIGNUP
} from './auth-actions';

const initialState = {
  status: 'pending',
  showSignup: false
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_WITH_GOOGLE:
      return {
        ...state,
        status: 'pending'
      };
    case HANDLE_SIGNED_IN:
      return {
        ...state,
        status: 'authenticated',
        token: action.token,
        user: action.user
      };
    case HANDLE_SIGNING_OUT:
      return {
        ...state,
        status: 'pending'
      };
    case HANDLE_SIGNED_OUT:
      return {
        ...state,
        status: 'unauthenticated'
      };
    case HANDLE_SIGN_IN_FAILURE:
      return {
        ...state,
        status: 'unauthenticated',
        type: 'HANDLE_SIGN_IN_FAILURE', 
        error: action.error,
        provider: action.provider
      }
    case TOGGLE_SIGNUP:
      return {
        ...state,
        showSignup: action.show
      }
    default:
      return state;
  }
}

export default auth;
