import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as authActions from './auth-actions';
import AuthWebComponent from './AuthComponent.web';
import AuthNativeComponent from './AuthComponent.native';
import authReducer from './auth-reducer';
import firebase from './firebase';
import ui from './ui';

export const reducer = authReducer;

export const actions = authActions;

export const setFirebase = firebase;

export const setUi = ui;


let connector = connect((state) => ({
  auth: state.auth,
  authPending: state.auth.status === 'pending',
  showSignup: state.showSignup
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
  onSignup: (show) => {
    dispatch(actions.toggleSignup(show));
  }
}))

export const NMAuthWebComponent = connector(AuthWebComponent);
export const NMAuthNativeComponent = connector(AuthNativeComponent);
