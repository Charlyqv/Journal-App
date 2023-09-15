import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';

import { startCreatingUserWithEmailPassword } from '../../store/auth';

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const [error, setError] = useState(null);

  const { status } = useSelector( state => state.auth );

  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

  const signUp = (e) => {
    e.preventDefault();
    dispatch( startCreatingUserWithEmailPassword({email, password, displayName}))
    .then((userCredential) => {
    }).catch((error) => {
      setError(error.message);
      })
    }    
 
  return (
    <AuthLayout tittle='Crear cuenta'>

      <form onSubmit={signUp} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Nombre completo"
              type="text"
              placeholder='Nombre completo'
              fullWidth
              name='displayName'
              value={ displayName }
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Grid>

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

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

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

            <Grid item xs={ 12 }>
              <Button 
                disabled={ isCheckingAuthentication }
                type='submit'
                variant='contained' 
                fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={ RouterLink }color='inherit' to="/auth/login">
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}

function getErrorDisplayMessage(errorType) {
  if (errorType === 'Firebase: Error (auth/email-already-in-use).') {
    return 'Ya existe un usuario con ese correo';
  }else if(errorType == 'Firebase: Error (auth/invalid-email).'){
    return 'Debe ser un correo electrónico válido';
  }else{
    return 'Ocurrió un error inesperado.';
  }
}