import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {signInWithGoogle, signInWithEmail, signUpWithEmail, toggleSignup} from './auth-actions';
import AuthComponent from './AuthComponent.web';
import reducer from './auth-reducer';


const AuthContainer = connect((state) => ({
  auth: state.auth,
  authPending: state.auth.status === 'pending',
  form: state.form.signIn,
  showSignup: state.showSignup
}),
(dispatch, ownProps) => ({
  dispatch,
  signInWithGoogle: () => {
    dispatch(signInWithGoogle(ownProps.firebase));
  },
  signInWithEmail: (event) => {
    event.preventDefault();
    const {email, password} = ownProps.form.values;
    dispatch(signInWithEmail(ownProps.firebase, email, password));
  },
  signUpWithEmail: (event) => {
    event.preventDefault();
    const {email, password, passwordConfirmation} = ownProps.form.values;
    dispatch(signUpWithEmail(ownProps.firebase, email, password, passwordConfirmation));
  },
  onSignup: (show) => {
    dispatch(toggleSignup(show));
  }
}), null, { withRef: true })(AuthComponent);


export default Auth