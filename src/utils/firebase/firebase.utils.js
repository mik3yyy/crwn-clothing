import  { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut, onAuthStateChanged} from 'firebase/auth'

import {getFirestore,doc,getDoc,setDoc , collection, writeBatch, query, getDocs} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyB66917djjRUrFSwk4rV2At9lL2gjtAOPM",
    authDomain: "crwn-clothing-db-bd826.firebaseapp.com",
    projectId: "crwn-clothing-db-bd826",
    storageBucket: "crwn-clothing-db-bd826.appspot.com",
    messagingSenderId: "544309403304",
    appId: "1:544309403304:web:4f59e1dc16225a90b6ec9d"
  };
 
const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();

provider.setCustomParameters ({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup (auth,provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    const collectionRef = collection(db, collectionKey);

    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc (collectionRef, object.title.toLowerCase());
        batch.set(docRef, object );

    });

    await batch.commit();
    console.log("done");

}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection (db,"catgerories");

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=> {
        const {title, items} = docSnapshot.data();      
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
    

    return categoryMap;
}



export const createUserDocumentFromAuth = async (userAuth, additionalInformation = { displayName : "Mike"}) => {
    
    const userDocRef =  doc(db, 'users', userAuth.uid )

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (e) {

            console.log("error creating the user", e.message);


        }

    }
    return userDocRef;

}

export const  createAuthUserWithEmailAndPassword =async (email,password) => {

    if(!email || !password) return;

  const reponse =  await createUserWithEmailAndPassword(auth,email,password);
  
  return reponse;
}
export const  signInAuthUserWithEmailAndPassword =async (email,password) => {

    if(!email || !password) return;

  const reponse =  await signInWithEmailAndPassword(auth,email,password);
  
  return reponse;
}
export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListeneer = (callback) => onAuthStateChanged(auth, callback)