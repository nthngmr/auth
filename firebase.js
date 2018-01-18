
let FIREBASE;

const firebase = (firebase) => {
  if (firebase) {
    FIREBASE = firebase;
  }
  return FIREBASE;
}

export default firebase;