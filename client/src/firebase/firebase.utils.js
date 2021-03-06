import "firebase/firestore";
import "firebase/auth";

import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyCE4mgM400zTKsDjLKFnJqXhakRR7B9HKs",
  authDomain: "crwn-ecommerce-adb73.firebaseapp.com",
  databaseURL: "https://crwn-ecommerce-adb73.firebaseio.com",
  projectId: "crwn-ecommerce-adb73",
  storageBucket: "crwn-ecommerce-adb73.appspot.com",
  messagingSenderId: "649778277455",
  appId: "1:649778277455:web:7c82e9ea6e17886ca00e3a",
  measurementId: "G-S26JWNTT7N"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }

    
  }
  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
const collectionRef = firestore.collection(collectionKey);
const batch = firestore.batch();

objectsToAdd.forEach(obj => {
  const newDocRef = collectionRef.doc();
batch.set(newDocRef,obj);
})

return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {title,items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,title,items

    };
  });
return transformedCollection.reduce((accumulator,collection)=> {
  accumulator[collection.title.toLowerCase()] = collection;
  return accumulator;
},{});
}; 

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve,reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

/**  set up google authentication utility  */
// gives access to the Google Auth Provider class
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// triggers google pop-up whenever we use the google auth provider for authentication and sign in
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
