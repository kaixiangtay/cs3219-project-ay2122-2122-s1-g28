// Import Settings
import React from 'react';
import { Link } from "react-router-dom";

// Import Redux
import { useSelector } from 'react-redux';

// Import Material-ui
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Import Resources (Remove when sync up with backend)
import profile from '../../resources/Profile.png';

// Import CSS
import styles from './VerifyEmail.module.css';

function VerifyEmail() {
    const signup = useSelector(state => state.signup);

    const unverifiedJsx = (
        <Grid 
            container 
            alignItems="center"
            justifyContent="center"
        >
            <Grid item md={12}>
                <h2>Verify your Email Address</h2>
            </Grid>
            <Grid item md={12}>
                <img alt='profile' src={profile} className={styles.profile}/>
            </Grid>
            <Grid item md={12}>
                <p>Please check your email for verification instructions.</p>
                <p>We have sent a verification email to:</p>
                {signup.email}
                <p>Didn’t receive the email? <a href='/verifyemail'>Resend Email</a></p>
            </Grid>
            <Grid item md={12}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={styles.returnLoginButton}
                    component={Link}
                    to="/login"
                >
                    Return to Login
                </Button>
            </Grid>
        </Grid>
    );

    const verifiedJsx = (
        <Grid 
            container 
            alignItems="center"
            justifyContent="center"
        >
            <Grid item md={12}>
                <h2>Your Email has been verified.</h2>
            </Grid>
            <Grid item md={12}>
                <img alt='profile' src={profile} className={styles.profile}/>
            </Grid>
            <Grid item md={12}>
                <Button variant="contained" color="primary" className={styles.returnLoginButton}>
                    Return to Login
                </Button>
            </Grid>
        </Grid>
    );
    
    return (
        <Container>
            <Paper 
                elevation={3} 
                variant="outlined" 
                className={styles.paper}
            >
                {
                    signup.verified 
                        ? verifiedJsx
                        : unverifiedJsx
                }
            </Paper>
        </Container>
    )
}

export default VerifyEmail;