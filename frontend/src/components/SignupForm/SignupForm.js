// Import settings
import { React } from 'react';
import { connect } from "react-redux";

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

function SignupForm(props) {
    const { onLogin } = props; 

    const handleLogin = () => {
        onLogin(true)
    };

    return (
        <Container>
            <Paper elevation={5} className={styles.paperStyle}>
                <form noValidate autoComplete="off">
                    <h2 className={styles.header}>Create a New Account</h2>
                    <Grid>
                        <h3 className={styles.inputLabel}>NUS Email:</h3>
                        <TextField 
                            variant="outlined" 
                            className={styles.textWidth}
                        />
                    </Grid>
                    <Grid>
                        <h3 className={styles.inputLabel}>Username:</h3>
                        <TextField 
                            variant="outlined" 
                            className={styles.textWidth}
                        />
                    </Grid>
                    <Grid>
                        <h3 className={styles.inputLabel}>Password:</h3>
                        <TextField 
                            variant="outlined" 
                            type="password" 
                            className={styles.textWidth}
                        />
                    </Grid>
                    <Grid className={styles.rowGap}>
                        <Button 
                            variant="contained" 
                            className={
                                `${styles.createAccountButtonGap} 
                                ${styles.createAccountButton}`}
                        >
                            Create Account
                        </Button>
                        <Button 
                            variant="contained" 
                            className={
                                `${styles.returnButtonGap} 
                                ${styles.returnButton}`}
                            onClick={handleLogin}
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
    return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(SignupForm);
