//Settings
import React from 'react';

//Material-ui
import { 
    Container,
    Grid 
 } from '@material-ui/core';

//Components
import LoginForm from '../../components/LoginForm/LoginForm.js';

//Resources
import NUSociaLifeLogo from '../../resources/NUSociaLife_Login_Logo.png';
import RandomScribble from '../../resources/RandomScribble.png';

//CSS
import styles from './Login.module.css';

function Login(props) {
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
