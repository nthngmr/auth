'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signOut = exports.updatePassword = exports.togglePasswordUpdate = exports.resetPassword = exports.togglePasswordReset = exports.signUpWithEmail = exports.toggleSignup = exports.signInWithEmail = exports.signInWithGoogle = exports.TOGGLE_PASSWORD_UPDATE = exports.PASSWORD_UPDATED = exports.HANDLE_PASSWORD_UPDATE_FAILURE = exports.TOGGLE_PASSWORD_RESET = exports.HANDLE_PASSWORD_RESET_FAILURE = exports.PASSWORD_RESET_SENT = exports.TOGGLE_SIGNUP = exports.SIGN_UP_WITH_EMAIL = exports.SIGN_IN_WITH_EMAIL = exports.SIGN_IN_WITH_GOOGLE = exports.HANDLE_SIGN_IN_FAILURE = exports.HANDLE_SIGNING_OUT = exports.HANDLE_SIGNED_OUT = exports.HANDLE_SIGNED_IN = undefined;

var _firebase = require('./firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HANDLE_SIGNED_IN = exports.HANDLE_SIGNED_IN = 'HANDLE_SIGNED_IN';
var HANDLE_SIGNED_OUT = exports.HANDLE_SIGNED_OUT = 'HANDLE_SIGNED_OUT';
var HANDLE_SIGNING_OUT = exports.HANDLE_SIGNING_OUT = 'HANDLE_SIGNING_OUT';
var HANDLE_SIGN_IN_FAILURE = exports.HANDLE_SIGN_IN_FAILURE = 'HANDLE_SIGN_IN_FAILURE';
var SIGN_IN_WITH_GOOGLE = exports.SIGN_IN_WITH_GOOGLE = 'SIGN_IN_WITH_GOOGLE';
var SIGN_IN_WITH_EMAIL = exports.SIGN_IN_WITH_EMAIL = 'SIGN_IN_WITH_EMAIL';
var SIGN_UP_WITH_EMAIL = exports.SIGN_UP_WITH_EMAIL = 'SIGN_UP_WITH_EMAIL';
var TOGGLE_SIGNUP = exports.TOGGLE_SIGNUP = 'TOGGLE_SIGNUP';
var PASSWORD_RESET_SENT = exports.PASSWORD_RESET_SENT = 'PASSWORD_RESET_SENT';
var HANDLE_PASSWORD_RESET_FAILURE = exports.HANDLE_PASSWORD_RESET_FAILURE = 'HANDLE_PASSWORD_RESET_FAILURE';
var TOGGLE_PASSWORD_RESET = exports.TOGGLE_PASSWORD_RESET = 'TOGGLE_PASSWORD_RESET';
var HANDLE_PASSWORD_UPDATE_FAILURE = exports.HANDLE_PASSWORD_UPDATE_FAILURE = 'HANDLE_PASSWORD_UPDATE_FAILURE';
var PASSWORD_UPDATED = exports.PASSWORD_UPDATED = 'PASSWORD_UPDATED';
var TOGGLE_PASSWORD_UPDATE = exports.TOGGLE_PASSWORD_UPDATE = 'TOGGLE_PASSWORD_UPDATE';

var signInWithGoogle = exports.signInWithGoogle = function signInWithGoogle(id) {
  return function (dispatch, getState) {
    var firebase = (0, _firebase2.default)();
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(function (result) {
      var user = {
        uid: result.user.uid,
        info: {
          displayName: result.user.displayName,
          email: result.user.email,
          photoUrl: result.user.photoURL
        }
      };
      return saveUserInfo(user).then(function () {
        return dispatch({
          type: HANDLE_SIGNED_IN,
          user: user,
          provider: 'google'
        });
      });
    }).catch(function (error) {
      return dispatch({
        type: HANDLE_SIGN_IN_FAILURE,
        error: error,
        provider: 'google'
      });
    });
  };
};

var signInWithEmail = exports.signInWithEmail = function signInWithEmail() {
  return function (dispatch, getState) {
    var state = getState();
    var firebase = (0, _firebase2.default)();

    var _$get = _.get(state, 'form.signIn.values', {}),
        email = _$get.email,
        password = _$get.password;

    return firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
      var user = {
        uid: result.uid,
        info: {
          displayName: result.displayName,
          email: result.email,
          photoUrl: ''
        }
      };
      return saveUserInfo(user).then(function () {
        return dispatch({
          type: HANDLE_SIGNED_IN,
          user: user,
          provider: 'email'
        });
      });
    }).catch(function (error) {
      return dispatch({
        type: HANDLE_SIGN_IN_FAILURE,
        error: error,
        provider: 'email'
      });
    });
  };
};

var toggleSignup = exports.toggleSignup = function toggleSignup(show) {
  return function (dispatch, getState) {
    dispatch({
      type: TOGGLE_SIGNUP,
      show: show
    });
  };
};

var signUpWithEmail = exports.signUpWithEmail = function signUpWithEmail() {
  return function (dispatch, getState) {
    var firebase = (0, _firebase2.default)();
    var state = getState();

    var _$get2 = _.get(state, 'form.signIn.values', {}),
        email = _$get2.email,
        password = _$get2.password;

    return firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {
      var user = {
        uid: result.uid,
        info: {
          displayName: result.displayName,
          email: result.email,
          photoUrl: ''
        }
      };
      return saveUserInfo(user).then(function () {
        return dispatch({
          type: HANDLE_SIGNED_IN,
          user: user,
          provider: 'email'
        });
      });
    }).catch(function (error) {
      return dispatch({
        type: HANDLE_SIGN_IN_FAILURE,
        error: error,
        provider: 'email'
      });
    });
  };
};

var togglePasswordReset = exports.togglePasswordReset = function togglePasswordReset(show) {
  return function (dispatch, getState) {
    dispatch({
      type: TOGGLE_PASSWORD_RESET,
      show: show
    });
  };
};

var resetPassword = exports.resetPassword = function resetPassword() {
  return function (dispatch, getState) {
    var firebase = (0, _firebase2.default)();
    var state = getState();

    var _$get3 = _.get(state, 'form.signIn.values', {}),
        email = _$get3.email;

    return firebase.auth().sendPasswordResetEmail(email).then(function () {
      return dispatch({
        type: PASSWORD_RESET_SENT
      });
    }).catch(function (error) {
      return dispatch({
        type: HANDLE_PASSWORD_RESET_FAILURE,
        error: error
      });
    });
  };
};

var togglePasswordUpdate = exports.togglePasswordUpdate = function togglePasswordUpdate(show, code) {
  return function (dispatch, getState) {
    dispatch({
      type: TOGGLE_PASSWORD_UPDATE,
      show: show,
      code: code
    });
  };
};

var updatePassword = exports.updatePassword = function updatePassword(newPassword) {
  return function (dispatch, getState) {
    var firebase = (0, _firebase2.default)();
    var state = getState();
    var code = _.get(state, 'auth.passwordReset.code');
    var password = _.get(state, 'form.signIn.values.password', newPassword);
    var promise = code ? firebase.auth().confirmPasswordReset(code, password) : firebase.auth().currentUser.updatePassword(password);
    return promise.then(function () {
      return dispatch({
        type: PASSWORD_UPDATED
      });
    }).catch(function (error) {
      return dispatch({
        type: HANDLE_PASSWORD_UPDATE_FAILURE,
        error: error
      });
    });
  };
};

function saveUserInfo(user) {
  var firebase = (0, _firebase2.default)();
  return firebase.firestore().doc('users/' + user.uid).set(user, { merge: true });
}

var signOut = exports.signOut = function signOut() {
  return function (dispatch, getState) {
    var firebase = (0, _firebase2.default)();
    dispatch({
      type: HANDLE_SIGNING_OUT
    });

    firebase.auth().signOut().then(function (result) {
      dispatch({
        type: HANDLE_SIGNED_OUT
      });
    });
  };
};