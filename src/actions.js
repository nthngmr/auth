import fb from './firebase';

export const HANDLE_SIGNED_IN = 'HANDLE_SIGNED_IN';
export const HANDLE_SIGNED_OUT = 'HANDLE_SIGNED_OUT';
export const HANDLE_SIGNING_OUT = 'HANDLE_SIGNING_OUT';
export const HANDLE_SIGN_IN_FAILURE = 'HANDLE_SIGN_IN_FAILURE';
export const SIGN_IN_WITH_GOOGLE = 'SIGN_IN_WITH_GOOGLE';
export const SIGN_IN_WITH_EMAIL = 'SIGN_IN_WITH_EMAIL';
export const SIGN_UP_WITH_EMAIL = 'SIGN_UP_WITH_EMAIL';
export const TOGGLE_SIGNUP = 'TOGGLE_SIGNUP';
export const PASSWORD_RESET_SENT = 'PASSWORD_RESET_SENT';
export const HANDLE_PASSWORD_RESET_FAILURE = 'HANDLE_PASSWORD_RESET_FAILURE'
export const TOGGLE_PASSWORD_RESET = 'TOGGLE_PASSWORD_RESET';
export const HANDLE_PASSWORD_UPDATE_FAILURE = 'HANDLE_PASSWORD_UPDATE_FAILURE';
export const PASSWORD_UPDATED = 'PASSWORD_UPDATED';
export const TOGGLE_PASSWORD_UPDATE = 'TOGGLE_PASSWORD_UPDATE';

export const signInWithGoogle = (id) => {
  return (dispatch, getState) => {
    let firebase = fb();
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((result) => {
      const user = {
        uid: result.user.uid,
        info: {
          displayName: result.user.displayName,
          email: result.user.email,
          photoUrl: result.user.photoURL
        }
      }
      return saveUserInfo(user).then(() => {
        return dispatch({
          type: HANDLE_SIGNED_IN,
          user,
          provider: 'google'
        });
      });
    }).catch((error) => {
      return dispatch({
        type: HANDLE_SIGN_IN_FAILURE,
        error,
        provider: 'google'
      });
    });
  }
}

export const signInWithEmail = () => {
  return (dispatch, getState) => {
    let state = getState();
    let firebase = fb();
    const {email, password}  = _.get(state, 'form.signIn.values', {});
    return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
      const user = {
        uid: result.uid,
        info: {
          displayName: result.displayName,
          email: result.email,
          photoUrl: ''
        }
      }
      return saveUserInfo(user).then(() => {
        return dispatch({
          type: HANDLE_SIGNED_IN,
          user,
          provider: 'email'
        });
      });
    }).catch((error) => {
      return dispatch({
        type: HANDLE_SIGN_IN_FAILURE,
        error,
        provider: 'email'
      });
    });
  }
}

export const toggleSignup = (show) => {
  return (dispatch, getState) => {
    dispatch({
      type: TOGGLE_SIGNUP,
      show
    })
  }
}

export const signUpWithEmail = () => {
  return (dispatch, getState) => {
    let firebase = fb();
    let state = getState();
    const {email, password}  = _.get(state, 'form.signIn.values', {});
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      const user = {
        uid: result.uid,
        info: {
          displayName: result.displayName,
          email: result.email,
          photoUrl: ''
        }
      }
      return saveUserInfo(user).then(() => {
        return dispatch({
          type: HANDLE_SIGNED_IN,
          user,
          provider: 'email'
        });
      });
    }).catch((error) => {
      return dispatch({
        type: HANDLE_SIGN_IN_FAILURE,
        error,
        provider: 'email'
      });
    });
  }
}

export const togglePasswordReset = (show) => {
  return (dispatch, getState) => {
    dispatch({
      type: TOGGLE_PASSWORD_RESET,
      show
    })
  }
}

export const resetPassword = () => {
  return (dispatch, getState) => {
    let firebase = fb();
    let state = getState();
    const {email}  = _.get(state, 'form.signIn.values', {});
    return firebase.auth().sendPasswordResetEmail(email).then(() => {
      return dispatch({
        type: PASSWORD_RESET_SENT
      });
    }).catch((error) => {
      return dispatch({
        type: HANDLE_PASSWORD_RESET_FAILURE,
        error
      })
    });
  }
}


export const togglePasswordUpdate = (show, code) => {
  return (dispatch, getState) => {
    dispatch({
      type: TOGGLE_PASSWORD_UPDATE,
      show,
      code
    })
  }
}

export const updatePassword = (newPassword) => {
  return (dispatch, getState) => {
    let firebase = fb();
    let state = getState();
    let code  = _.get(state, 'auth.passwordReset.code');
    let password = _.get(state, 'form.signIn.values.password', newPassword);
    let promise = code ? firebase.auth().confirmPasswordReset(code, password) : 
                         firebase.auth().currentUser.updatePassword(password);
    return promise.then(() => {
      return dispatch({
        type: PASSWORD_UPDATED
      });
    }).catch((error) => {
      return dispatch({
        type: HANDLE_PASSWORD_UPDATE_FAILURE,
        error
      })
    });
  }
}

function saveUserInfo(user) {
  let firebase = fb();
  return firebase.firestore().doc(`users/${user.uid}`).set(user, {merge: true});
}

export const signOut = () => {
  return (dispatch, getState) => {
    let firebase = fb();
    dispatch({
      type: HANDLE_SIGNING_OUT
    });

    firebase.auth().signOut().then((result) => {
      dispatch({
        type: HANDLE_SIGNED_OUT
      });
    })
  }
}
