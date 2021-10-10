// Import Settings
import React from 'react';
import { Redirect } from "react-router-dom";

// Import Redux
import { useSelector } from 'react-redux';

// Import Material-ui
import { Container, Grid } from '@material-ui/core';

// Import Components
import SignupForm from '../../components/SignupForm/SignupForm.js';

// Import Resources
import NUSociaLifeLogo from '../../resources/NUSociaLife_Login_Logo.png';
import RandomScribble from '../../resources/RandomScribble.png';

// Import CSS
import styles from './Signup.module.css';

function Signup() {
  
  const signup = useSelector(state => state.signup);

  if(signup.success) {
    return <Redirect to='/verify-email' />
  }

  return (
    <div>
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
            <Grid item md={6} xs={12} sm={12}>
              <SignupForm/>
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
    </div>
  )
}

export default Signup;
