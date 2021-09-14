import React from 'react';

//Material-ui
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

//Components
import LoginForm from '../../components/LoginForm/LoginForm.js';

//CSS
import styles from './Login.module.css';

//Resources
import NUSociaLifeLogo from '../../resources/NUSociaLife_Login_Logo.png';
import RandomScribble from '../../resources/RandomScribble.png';

function Login() {
    return (
        <div>
            <Container>
                <Grid container 
                    alignItems="center"
                    justifyContent="center"
                    className={styles.verticalCenter}
                >
                    <Grid item md={6}>
                        <img alt='NUSociaLifeLogo' src={NUSociaLifeLogo}/>
                    </Grid>
                    <Grid item md={6}>
                        <LoginForm/>
                    </Grid>
                </Grid>
            </Container>
            <Grid item md={12}>
                <img alt='RandomScribble' src={RandomScribble} className={styles.randomScribble}/>
            </Grid>
        </div>
        
    )
}

export default Login;