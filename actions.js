'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signOut = exports.signUpWithEmail = exports.toggleSignup = exports.signInWithEmail = exports.signInWithGoogle = exports.TOGGLE_SIGNUP = exports.SIGN_UP_WITH_EMAIL = exports.SIGN_IN_WITH_EMAIL = exports.SIGN_IN_WITH_GOOGLE = exports.HANDLE_SIGN_IN_FAILURE = exports.HANDLE_SIGNING_OUT = exports.HANDLE_SIGNED_OUT = exports.HANDLE_SIGNED_IN = undefined;

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

var signInWithGoogle = exports.signInWithGoogle = function signInWithGoogle(id) {
  return function (dispatch, getState) {
    var firebase = (0, _firebase2.default)();
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(function (result) {
      return saveUserInfo(result.user).then(function () {
        return dispatch({
          type: HANDLE_SIGNED_IN,
          user: result.user,
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
      var info = {
        displayName: result.displayName,
        email: result.email,
        uid: result.uid
      };
      return saveUserInfo(info).then(function () {
        return dispatch({
          type: HANDLE_SIGNED_IN,
          user: { info: info },
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
      var info = {
        displayName: result.displayName,
        email: result.email,
        uid: result.uid
      };
      return saveUserInfo(info).then(function () {
        return dispatch({
          type: HANDLE_SIGNED_IN,
          user: { info: info },
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

function saveUserInfo(user) {
  var firebase = (0, _firebase2.default)();
  var info = {
    name: user.displayName || '',
    email: user.email,
    photoUrl: user.photoURL || '',
    uid: user.uid
  };
  return firebase.firestore().doc('users/' + user.uid).set({ info: info }, { merge: true });
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