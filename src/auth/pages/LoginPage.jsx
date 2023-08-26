import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Apple, FacebookTwoTone, Google } from '@mui/icons-material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';

import { startGoogleSignIn, startFacebookSignIn, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm( formData );

  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( startLoginWithEmailPassword({ email, password }));
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }

  const onFacebookSignIn = () => {
    dispatch( startFacebookSignIn() );
  }
            
  const botonFBStyle = {
    backgroundColor: 'rgb(24, 119, 242)', // R:255, G:0, B:0 - Rojo
    color: 'white', // Cambia el color del texto según tu necesidad
    padding: '10px 20px', // Añade estilos adicionales según tus preferencias
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <AuthLayout tittle='Login'>
      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Correo"
              type="email"
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
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
              onChange={ onInputChange }
            />
          </Grid>

          <Grid 
            container 
            display={ !!errorMessage ? '': 'none' }
            sx={{ mt: 1 }}>
            <Grid 
              item 
              xs={ 12 } 
              
            >
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } sm={ 12 }>
              <Button 
                disabled= { isAuthenticating }
                type='submit' 
                variant='contained' 
                fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 12 }>
              <Button 
                disabled= { isAuthenticating }
                variant='contained' 
                fullWidth
                onClick={ onGoogleSignIn }>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

            <Grid item xs={ 12 } sm={ 12 }>
              <Button 
                disabled= { isAuthenticating }
                variant='contained' 
                fullWidth
                onClick={ onFacebookSignIn }
                style={botonFBStyle}
              >
                <FacebookTwoTone />
                <Typography sx={{ ml: 1 }}>Facebook</Typography>
              </Button>
            </Grid>

            <Grid item xs={ 12 } sm={ 12 }>
              <Button 
                disabled= { isAuthenticating }
                variant='contained' 
                fullWidth
                onClick={ onGoogleSignIn }>
                <Apple />
                <Typography sx={{ ml: 1 }}>iOS</Typography>
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
