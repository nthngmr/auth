'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AUTH_ERRORS = {
  'auth/user-not-found': 'User account not found. Check your email address for errors or click below to signup.',
  'auth/too-many-requests': 'Too many login attempts. Try again in a little bit.',
  'auth/user-disabled': 'This user account has been disabled. Please contact support to learn more.',
  'auth/network-request-failed': 'There was a problem receiving your request. Please check your internet connection and try again.',
  'auth/account-exists-with-different-credential': 'Password is incorrect.',
  'auth/invalid-action-code': 'This password reset link has expired'
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    auth: state.auth,
    authPending: state.auth.status === 'pending',
    showSignup: state.auth.showSignup,
    showPasswordReset: _lodash2.default.get(state, 'auth.passwordReset.show', false),
    passwordResetStatus: _lodash2.default.get(state, 'auth.passwordReset.status'),
    passwordResetError: AUTH_ERRORS[_lodash2.default.get(state, 'auth.passwordReset.error.code')],
    showPasswordResetForm: _lodash2.default.get(state, 'auth.passwordReset.updating'),
    authError: AUTH_ERRORS[_lodash2.default.get(state, 'auth.error.code')],
    badPasswordResetCode: _lodash2.default.get(state, 'auth.passwordReset.error.code') === 'auth/invalid-action-code'
  };
}, function (dispatch, ownProps) {
  return {
    dispatch: dispatch,
    signInWithGoogle: function signInWithGoogle() {
      dispatch(actions.signInWithGoogle());
    },
    signInWithEmail: function signInWithEmail(event) {
      event.preventDefault();
      dispatch(actions.signInWithEmail());
    },
    signUpWithEmail: function signUpWithEmail(event) {
      event.preventDefault();
      dispatch(actions.signUpWithEmail());
    },
    resetPassword: function resetPassword(event) {
      event.preventDefault();
      dispatch(actions.resetPassword());
    },
    updatePassword: function updatePassword(event) {
      event.preventDefault();
      dispatch(actions.updatePassword());
    },
    onSignUp: function onSignUp(show) {
      dispatch(actions.toggleSignup(show));
    },
    onPasswordReset: function onPasswordReset(show) {
      dispatch(actions.togglePasswordReset(show));
    }
  };
});