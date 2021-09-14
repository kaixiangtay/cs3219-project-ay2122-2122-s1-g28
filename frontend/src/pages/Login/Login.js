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

function Login() {
    return (
        <Container>
            <Grid container 
                alignItems="center"
                justify="center"
                className={styles.verticalCenter}
            >
                <Grid md={6}>
                    <img alt='NUSociaLifeLogo' src={NUSociaLifeLogo}/>
                </Grid>
                <Grid md={6}>
                    <LoginForm/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login;