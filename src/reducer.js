import _ from 'lodash';
import {
  HANDLE_SIGNED_IN,
  HANDLE_SIGNED_OUT,
  HANDLE_SIGNING_OUT,
  SIGN_IN_WITH_GOOGLE,
  HANDLE_SIGN_IN_FAILURE,
  TOGGLE_SIGNUP,
  TOGGLE_PASSWORD_RESET,
  PASSWORD_RESET_SENT,
  HANDLE_PASSWORD_RESET_FAILURE,
  PASSWORD_UPDATED,
  HANDLE_PASSWORD_UPDATE_FAILURE,
  TOGGLE_PASSWORD_UPDATE
} from './actions';

const initialState = {
  status: 'pending',
  showSignup: false,
  passwordReset: {
    show: false,
    status: 'unsent',
    updating: false
  }
}

const authReducer = (state = initialState, action) => {
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
    case TOGGLE_PASSWORD_RESET:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          show: action.show,
          status: 'unsent',
          updating: false,
          error: {}
        } 
      }
    case PASSWORD_RESET_SENT:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          status: 'sent'
        } 
      }
    case HANDLE_PASSWORD_RESET_FAILURE:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          status: 'error',
          error: action.error
        } 
      }
    case TOGGLE_PASSWORD_UPDATE:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          show: action.show,
          updating: true,
          status: 'unsent',
          code: action.code
        }
      }
    case PASSWORD_UPDATED:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          status: 'updated',
          updating: false,
          show: false,
          code: null,
          error: {}
        } 
      }
    case HANDLE_PASSWORD_UPDATE_FAILURE:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          status: 'error',
          error: action.error
        } 
      }
    default:
      return state;
  }
}

export default authReducer;
