// Import settings
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";

// Import Redux
import { signupClear, signupUser } from '../../actions/signup';
import { useSelector, useDispatch } from 'react-redux';

// Import Material-ui
import { 
    Button,
    Container, 
    Grid, 
    Paper, 
    TextField 
 } from '@material-ui/core';

// Import CSS
import styles from './SignupForm.module.css';

function SignupForm() {
    const [email, setEmail] = useState(' ');
    const [name, setName] = useState(' '); 
    const [password, setPassword] = useState(' '); 

    let history = useHistory(); 

    const signup = useSelector(state => state.signup);
    const dispatch = useDispatch();

    const handleSignUp = () => {
        dispatch(signupUser(name, email, password));
    };

    useEffect(() => {
        if(signup.signupSuccess) {
            history.push("/login");
            dispatch(signupClear())
        }
    }, [dispatch, history, signup])

    return (
        <Container>
            <Paper elevation={5} className={styles.paperStyle}>
                <form noValidate autoComplete="off">
                    <h2 className={styles.header}>Create a New Account</h2>
                    <Grid>
                        <h3 className={styles.inputLabel}>NUS Email:</h3>
                        <TextField 
                            required
                            variant="outlined" 
                            className={styles.textWidth}
                            onChange={event => { 
                                setEmail(event.target.value)
                            }}
                        />
                    </Grid>
                    <Grid>
                        <h3 className={styles.inputLabel}>Name:</h3>
                        <TextField 
                            required
                            variant="outlined" 
                            className={styles.textWidth}
                            onChange={event => { 
                                setName(event.target.value)
                            }}
                        />
                    </Grid>
                    <Grid>
                        <h3 className={styles.inputLabel}>Password:</h3>
                        <TextField 
                            required
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
                                `${styles.createAccountButtonGap} 
                                ${styles.createAccountButton}`}
                            onClick={handleSignUp}
                        >
                            Create Account
                        </Button>
                        <Button 
                            variant="contained" 
                            className={
                                `${styles.returnButtonGap} 
                                ${styles.returnButton}`
                            }
                            component={Link}
                            to="/login"
                        >
                            Go Back to Login
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default SignupForm;
