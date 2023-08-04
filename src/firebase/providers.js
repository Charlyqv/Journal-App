import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {

  try{
    const result = await signInWithPopup( FirebaseAuth, googleProvider );
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      // User info
      displayName, email, photoURL, uid
    }
    
  } catch (error) {  

    const errorCode = error.code;
    const errorMessage = error.message;

    return{
      ok: false,
      errorMessage,
    }
  }
}


export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
    
  try {
    // const auth = getAuth();
    const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
    const { uid, photoURL } = resp.user;
    // console.log("🚀 ~ file: providers.js:38 ~ registerUserWithEmailPassword ~ resp:", resp);
    await updateProfile( FirebaseAuth.currentUser, { displayName } );
    // await updateProfile( auth.currentUser, { displayName });

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {
    return { ok: false, errorMessage: 'Ya existe un usuario con ese correo'};
  }
}