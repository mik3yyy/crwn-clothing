import  { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'
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

export const db = getFirestore()
export const createUserDocumentFromAuth = async (userAuth) => {
    
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
                createdAt
            })
        } catch (e) {

            console.log("error creating the user", e.message);


        }

    }
    return userDocRef;

}