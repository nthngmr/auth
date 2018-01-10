import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actions from './auth-actions';
import AuthComponent from './AuthComponent.web';
import reducer from './auth-reducer';


export const auth = reducer;
export const authActions = actions;

export const NMAuthComponent = connect((state) => ({
  auth: state.auth,
  authPending: state.auth.status === 'pending',
  showSignup: state.showSignup
}),
(dispatch, ownProps) => ({
  dispatch,
  signInWithGoogle: () => {
    dispatch(actions.signInWithGoogle(ownProps.firebase));
  },
  signInWithEmail: (event) => {
    event.preventDefault();
    dispatch(actions.signInWithEmail(ownProps.firebase));
  },
  signUpWithEmail: (event) => {
    event.preventDefault();
    dispatch(actions.signUpWithEmail(ownProps.firebase));
  },
  onSignup: (show) => {
    dispatch(actions.toggleSignup(show));
  }
}))(AuthComponent);


