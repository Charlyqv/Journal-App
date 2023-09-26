import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { FirebaseAuth } from "../../firebase/config";

import { AuthLayout } from '../layout/AuthLayout';

import { startGoogleSignIn } from '../../store/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const LoginPage = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const { status } = useSelector( state => state.auth );

  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword( FirebaseAuth, email, password)
    .then((userCredential) => {
    }).catch((error) => {
      setError(error.message);
      })
    }    
 
  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout tittle='Login'>
      <form onSubmit={signIn} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Correo"
              type="email"
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={ email }
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Contraseña"
              type="password"
              placeholder='*******'
              fullWidth
              name='password'
              value={ password }
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          <Grid 
            container 
            sx={{ mt: 1 }}>
            <Grid 
              item 
              xs={ 12 }
            >
              {error && (
                <Alert severity="error">
                  {getErrorDisplayMessage(error)}
                </Alert>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                disabled= { isAuthenticating }
                type="submit" 
                variant='contained' 
                fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                disabled= { isAuthenticating }
                variant='contained' 
                fullWidth
                onClick={ onGoogleSignIn }>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={ RouterLink }color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

function getErrorDisplayMessage(errorType) {
  if (errorType === 'Firebase: Error (auth/user-not-found).') {
    return 'No pudimos encontrar tu Cuenta.';
  }else if(errorType == 'Firebase: Error (auth/wrong-password).'){
    return 'Contraseña incorrecta.';
  }else if(errorType == 'Firebase: Error (auth/invalid-email).' || errorType == 'Firebase: Error (auth/missing-password).'){
    return 'Todos los campos son obligatorios';
  }else if(errorType == 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'){
    return 'Realizaste demasiados intentos, vuelve más tarde.';
  }else{
    return 'Ocurrió un error inesperado.';
  }
}
