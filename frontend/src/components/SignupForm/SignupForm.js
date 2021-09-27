// Import settings
import React, { useState } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
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
import styles from './SignupForm.module.css';

// Import Actions
import { signupUser } from '../../actions/signup';

function SignupForm(props) {
    const { submitSignupRequest } = props; 
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 

    const handleSubmit = () => {
        let userData = { 
            email, 
            username,
            password 
        };

        // Ensure all inputs are present before submitting
        if (!userData.email) {
            toast.error("Please input an email address.", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (!userData.username) { 
            toast.error("Please input a username.", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (!userData.password) { 
            toast.error("Please input a password.", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            submitSignupRequest(userData);
        }
    }; 

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
                        <h3 className={styles.inputLabel}>Username:</h3>
                        <TextField 
                            required
                            variant="outlined" 
                            className={styles.textWidth}
                            onChange={event => { 
                                setUsername(event.target.value)
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
                            onClick={handleSubmit}
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

function mapStateToProps(state) { 
    return {};
}

function mapDispatchToProps(dispatch, props) { 
    return {
        submitSignupRequest: userData => dispatch(signupUser(userData, props))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(withConnect(SignupForm));
