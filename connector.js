import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';

export default connect((state) => ({
  auth: state.auth,
  authPending: state.auth.status === 'pending',
  showSignup: state.auth.showSignup
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
  onSignUp: (show) => {
    dispatch(actions.toggleSignup(show));
  }
}))
