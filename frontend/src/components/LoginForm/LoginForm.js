import React from 'react';

//Material-ui
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

//CSS
import styles from './LoginForm.module.css';

function LoginForm() {
    return (
        <Container>
            <Paper elevation={5} className={styles.paperStyle}>
                <form noValidate autoComplete="off">
                    <Grid>
                        <h3>NUS Email:</h3>
                        <TextField variant="outlined" className={styles.textWidth}/>
                    </Grid>
                    <Grid>
                        <h3>Password:</h3>
                        <TextField variant="outlined" className={styles.textWidth}/>
                    </Grid>
                    <Grid className={styles.rowGap}>
                        <Button variant="contained" className={`${styles.buttonGap} ${styles.loginButton}`}>
                            Login
                        </Button>
                        <Button variant="contained" className={`${styles.buttonGap} ${styles.signUpButton}`}>
                            Sign Up
                        </Button>
                    </Grid>
                    <a href="/#">Forget Password?</a>
                </form>
            </Paper>
        </Container>
    )
}

export default LoginForm;