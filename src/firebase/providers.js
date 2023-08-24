import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

const facebookProvider = new FacebookAuthProvider();

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

export const singInWithFacebook = async() => {

  try{
    const result = await signInWithPopup( FirebaseAuth, facebookProvider );
    
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
    const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
    const { uid, photoURL } = resp.user;
    await updateProfile( FirebaseAuth.currentUser, { displayName } );

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {
    return { ok: false, errorMessage: 'Ya existe un usuario con ese correo'};
  }
}

export const loginWithEmailPassword = async({ email, password}) => {

  try {
    const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
    const { uid, photoURL, displayName } = resp.user;
   
    return {
      ok: true,
      uid, photoURL, displayName
    }

  } catch (error) {

    const errorCode = error.code;
 
    if (errorCode == 'auth/user-not-found') {
      return { ok: false, errorMessage: 'No pudimos encontrar tu Cuenta.'};
    }
    return { ok: false, errorMessage: 'Contraseña incorrecta.'};
  }

}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
}