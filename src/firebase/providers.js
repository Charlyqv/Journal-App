import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
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
    const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
    const { uid, photoURL } = resp.user;
    await updateProfile( FirebaseAuth.currentUser, { displayName } );

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {
    
    const errorCode = error.code;

    if (errorCode == 'auth/email-already-in-use') {
      return { ok: false, errorMessage: 'Ya existe un usuario con ese correo'};
    }else if(errorCode == 'auth/invalid-email'){
      return { ok: false, errorMessage: 'Debe ser un correo electrónico válido'};
    }
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
    }else if(errorCode == 'auth/wrong-password'){
      return { ok: false, errorMessage: 'Contraseña incorrecta.'};
    }else if(errorCode == 'auth/invalid-email' || errorCode == 'auth/missing-password'){
      return { ok: false, errorMessage: 'Todos los campos son obligatorios'};
    }else{
      return { ok: true, errorMessage: ''};
    }
  }

}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
}