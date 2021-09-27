// Import settings
import React, { useState } from 'react';
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";

// Import Material-ui
import {
    Button,
    Container,
    Grid,
    Paper,
    TextField
} from '@material-ui/core';

// Import CSS
import styles from './LoginForm.module.css';

// Import actions 
import { loginUser } from '../../actions/auth'

function LoginForm(props) {
    const { loginSuccess, submitLoginRequest } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        // Ensure all inputs are present before submitting
        if (!email) {
            toast.error("Please input an email address.", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (!password) {
            toast.error("Please input a password.", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            submitLoginRequest(email, password);
        }
    };

    if (loginSuccess) {
        return <Redirect to='/findfriends' />
    } else {
        return (
            <Container>
                <Paper elevation={5} className={styles.paperStyle}>
                    <form noValidate autoComplete="off">
                        <Grid>
                            <h3 className={styles.inputLabel}>NUS Email:</h3>
                            <TextField
                                variant="outlined"
                                className={styles.textWidth}
                                onChange={event => {
                                    setEmail(event.target.value)
                                }}
                            />
                        </Grid>
                        <Grid>
                            <h3 className={styles.inputLabel}>Password:</h3>
                            <TextField
                                variant="outlined"
                                type="password"
                                className={styles.textWidth}
                                onChange={event => {
                                    setPassword(event.target.value)
                                }}
                            />
                        </Grid>
                        <Grid className={styles.rowGap}>
                            <Button
                                variant="contained"
                                className={
                                    `${styles.loginButtonGap} 
                                    ${styles.loginButton}`}
                                onClick={handleSubmit}
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                className={
                                    `${styles.signupButtonGap} 
                                    ${styles.signUpButton}`
                                }
                                component={Link}
                                to="/signup"
                            >
                                Sign Up
                            </Button>
                        </Grid>
                        <a href="/#">Forget Password?</a>
                    </form>
                </Paper>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        loginSuccess: state.auth.loginSuccess
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        submitLoginRequest: (email, password) => dispatch(loginUser(email, password))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(LoginForm);
