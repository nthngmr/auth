import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import {signInWithGoogle, signInWithEmail, signUpWithEmail, toggleSignup} from './auth-actions';
import AuthComponent from './AuthComponent.web';
import auth from './auth-reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

const middleware = [thunk];

const reducer = combineReducers({
  auth,
  form: formReducer
});

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

// export const NMAuthReducer = reducer;

const NMAuthContainer = connect((state) => ({
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
}))(AuthComponent);


class NMAuthComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }  

  render() {

    return (
      <Provider store={store}>
        <NMAuthContainer firebase={this.props.firebase}/>
      </Provider>
    );
  }
}

export default NMAuthComponent;