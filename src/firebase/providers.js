import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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
  console.log("🚀 ~ file: providers.js:34 ~ registerUserWithEmailPassword ~ { email, password, displayName }:", { email, password, displayName })
  
  try {
    const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
    const { uid, photoURL } = resp.user;
    console.log("🚀 ~ file: providers.js:36 ~ registerUserWithEmailPassword ~ resp:", resp)

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {
    console.log("🚀 ~ file: providers.js:37 ~ registerUserWithEmailPassword ~ error:", error)
    return { ok: false, errorMessage: error.message}
  }
}