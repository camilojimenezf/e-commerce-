import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCoJ-wQKBU0486UkF0yJlFeIdMHDzDZXR0",
    authDomain: "crwn-db-32a83.firebaseapp.com",
    databaseURL: "https://crwn-db-32a83.firebaseio.com",
    projectId: "crwn-db-32a83",
    storageBucket: "crwn-db-32a83.appspot.com",
    messagingSenderId: "196943876419",
    appId: "1:196943876419:web:a4c330c24653759342dff6",
    measurementId: "G-5TTHFNNM9Q"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    console.log(snapShot);
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(err) {
            console.log('error creating user', err.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;