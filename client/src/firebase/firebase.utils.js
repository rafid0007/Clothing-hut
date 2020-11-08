import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDFW2QutpDo_nncZU9WQA5PBUa1BCUwE-8",
    authDomain: "react-commerce-db-b00aa.firebaseapp.com",
    databaseURL: "https://react-commerce-db-b00aa.firebaseio.com",
    projectId: "react-commerce-db-b00aa",
    storageBucket: "react-commerce-db-b00aa.appspot.com",
    messagingSenderId: "635617394575",
    appId: "1:635617394575:web:5cc7a066aa1e61bdb6d5fa",
    measurementId: "G-P3SYQD8WD5"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const userSnap = await userRef.get();
    if (!userSnap.exists) {
        const {displayName, email} = userAuth;
        const created_at = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                created_at,
                ...additionalData
            })
        } catch (e) {
            console.log('error creating user', e.message);
        }
    }
    // console.log(userSnap.exists);
    return userRef;
};

export const addCollectionsandDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj =>{
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj)
});
    return await batch.commit();
};

export const convertCollectionsSnapShotToMap = collectionsSnapshot => {
    const transformedCollectionsArray = collectionsSnapshot.docs.map(doc => {
        const {title, items} =doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollectionsArray.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;