import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';
import _ from 'lodash';

const AUTH_ERRORS = {
  'auth/user-not-found': 'User account not found. Check your email address for errors or click below to signup.',
  'auth/too-many-requests': 'Too many login attempts. Try again in a little bit.',
  'auth/user-disabled': 'This user account has been disabled. Please contact support to learn more.',
  'auth/network-request-failed': 'There was a problem receiving your request. Please check your internet connection and try again.',
  'auth/account-exists-with-different-credential': 'Password is incorrect.',
  'auth/invalid-action-code': 'This password reset link has expired'
}

export default connect((state) => ({
  auth: state.auth,
  authPending: state.auth.status === 'pending',
  showSignup: state.auth.showSignup,
  showPasswordReset: _.get(state, 'auth.passwordReset.show', false),
  passwordResetStatus: _.get(state, 'auth.passwordReset.status'),
  passwordResetError: AUTH_ERRORS[_.get(state, 'auth.passwordReset.error.code')],
  showPasswordResetForm: _.get(state, 'auth.passwordReset.updating'), 
  authError: AUTH_ERRORS[_.get(state, 'auth.error.code')],
  badPasswordResetCode: _.get(state, 'auth.passwordReset.error.code') === 'auth/invalid-action-code'
}),
(dispatch, ownProps) => ({
  dispatch,
  signInWithGoogle: () => {
    dispatch(actions.signInWithGoogle());
  },
  signInWithEmail: (event) => {
    event.preventDefault();
    dispatch(actions.signInWithEmail());
  },
  signUpWithEmail: (event) => {
    event.preventDefault();
    dispatch(actions.signUpWithEmail());
  },
  resetPassword: (event) => {
    event.preventDefault();
    dispatch(actions.resetPassword());
  },
  updatePassword: (event) => {
    event.preventDefault();
    dispatch(actions.updatePassword());
  },
  onSignUp: (show) => {
    dispatch(actions.toggleSignup(show));
  },
  onPasswordReset: (show) => {
    dispatch(actions.togglePasswordReset(show));
  }
}))
