import fb from './firebase';

export const HANDLE_SIGNED_IN = 'HANDLE_SIGNED_IN';
export const HANDLE_SIGNED_OUT = 'HANDLE_SIGNED_OUT';
export const HANDLE_SIGNING_OUT = 'HANDLE_SIGNING_OUT';
export const HANDLE_SIGN_IN_FAILURE = 'HANDLE_SIGN_IN_FAILURE';
export const SIGN_IN_WITH_GOOGLE = 'SIGN_IN_WITH_GOOGLE';
export const SIGN_IN_WITH_EMAIL = 'SIGN_IN_WITH_EMAIL';
export const SIGN_UP_WITH_EMAIL = 'SIGN_UP_WITH_EMAIL';
export const TOGGLE_SIGNUP = 'TOGGLE_SIGNUP';



export const signInWithGoogle = (id) => {
  return (dispatch, getState) => {
    debugger
    let firebase = fb();
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(function(result) {
      return saveUserInfo(result.user).then(() => {
        return dispatch({
          type: HANDLE_SIGNED_IN, 
          user: result.user,
          provider: 'google'
        });
      });
    }).catch(function(error) {
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
    return firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
      const info = {
        displayName: result.displayName,
        email: result.email,
        uid: result.uid
      }
      return saveUserInfo(info).then(() => {
        return dispatch({
          type: HANDLE_SIGNED_IN, 
          user: {info},
          provider: 'email'
        });
      });
    }).catch(function(error) {
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
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
      const info = {
        displayName: result.displayName,
        email: result.email,
        uid: result.uid
      }
      return saveUserInfo(info).then(() => {
        return dispatch({
          type: HANDLE_SIGNED_IN, 
          user: {info},
          provider: 'email'
        });
      });
    }).catch(function(error) {
      return dispatch({
        type: HANDLE_SIGN_IN_FAILURE, 
        error,
        provider: 'email'
      });
    });
  }
}

function saveUserInfo(user) {
  let firebase = fb();
  let info = {
    name: user.displayName || '',
    email: user.email,
    photoUrl: user.photoURL || '',
    uid: user.uid
  }
  return firebase.firestore().doc(`users/${user.uid}`).set({info});
}

export const signOut = () => {
  return (dispatch, getState) => {
    let firebase = fb();
    dispatch({
      type: HANDLE_SIGNING_OUT
    });

    firebase.auth().signOut().then(function(result) {
      dispatch({
        type: HANDLE_SIGNED_OUT
      });
    })
  }
}
