//Settings
import React from 'react';

//Material-ui
import { 
    Container,
    Grid 
 } from '@material-ui/core';

//Components
import SignupForm from '../../components/SignupForm/SignupForm.js';

//Resources
import NUSociaLifeLogo from '../../resources/NUSociaLife_Login_Logo.png';
import RandomScribble from '../../resources/RandomScribble.png';

//CSS
import styles from './Signup.module.css';

function Signup(props) {
    const handleLogin = (isLogin) => { 
        if (isLogin) { 
          props.history.push('/login')
        }
    };
    
  return (
    <div>
      <Container>
        <Grid 
          container 
          alignItems="center"
          justifyContent="center"
          className={styles.verticalCenter}
        >
          <Grid item md={6}>
            <img alt='NUSociaLifeLogo' src={NUSociaLifeLogo}/>
          </Grid>
          <Grid item md={6} xs ={12} sm={12}>
            <SignupForm onLogin={handleLogin}/>
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

export default Signup;
