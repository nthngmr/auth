'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  status: 'pending',
  showSignup: false
};

var authReducer = function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _actions.SIGN_IN_WITH_GOOGLE:
      return _extends({}, state, {
        status: 'pending'
      });
    case _actions.HANDLE_SIGNED_IN:
      return _extends({}, state, {
        status: 'authenticated',
        token: action.token,
        user: action.user
      });
    case _actions.HANDLE_SIGNING_OUT:
      return _extends({}, state, {
        status: 'pending'
      });
    case _actions.HANDLE_SIGNED_OUT:
      return {
        status: 'unauthenticated'
      };
    case _actions.HANDLE_SIGN_IN_FAILURE:
      return _extends({}, state, {
        status: 'unauthenticated',
        type: 'HANDLE_SIGN_IN_FAILURE',
        error: action.error,
        provider: action.provider
      });
    case _actions.TOGGLE_SIGNUP:
      return _extends({}, state, {
        showSignup: action.show
      });
    default:
      return state;
  }
};

exports.default = authReducer;