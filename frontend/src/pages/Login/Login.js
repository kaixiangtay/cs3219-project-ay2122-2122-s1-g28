// Import Settings
import React, { useEffect } from 'react';

// Import Redux
import { signupReset } from '../../actions/signup';
import { navigationReset } from '../../actions/navigation';
import { useSelector, useDispatch } from 'react-redux';

// Import Material-ui
import { Container, Grid } from '@material-ui/core';

// Import Components
import LoginForm from '../../components/LoginForm/LoginForm.js';

// Import Resources
import NUSociaLifeLogo from '../../resources/NUSociaLife_Login_Logo.png';
import RandomScribble from '../../resources/RandomScribble.png';

// Import CSS
import styles from './Login.module.css';

function Login() {
  const signup = useSelector(state => state.signup);
  const navigation = useSelector(state => state.navigation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signupReset());
    dispatch(navigationReset())
  }, [dispatch, signup, navigation])

  return (
    <div>
      <Container>
        <Grid 
          container 
          alignItems="center"
          justifyContent="center"
          className="empty-navbar-gap"
        >
          <Grid item md={6}>
            <img alt='NUSociaLifeLogo' src={NUSociaLifeLogo}/>
          </Grid>
          <Grid item md={6} xs ={12} sm={12}>
            <LoginForm/>
          </Grid>
        </Grid>
      </Container>
      <Grid item md={12}>
        <img 
          alt='RandomScribble' 
          src={RandomScribble} 
          className={styles.randomScribble}
        />
      </Grid>
    </div>
  )
}

export default Login;
