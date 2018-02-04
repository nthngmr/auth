'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    auth: state.auth,
    authPending: state.auth.status === 'pending',
    showSignup: state.auth.showSignup
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
    onSignUp: function onSignUp(show) {
      dispatch(actions.toggleSignup(show));
    }
  };
});