// Import settings
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import Material-ui
import { Button, Container, Grid, Paper, TextField } from "@material-ui/core";

// Import CSS
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Remove when bringing in redux
  console.log(email);
  console.log(password);

  return (
    <Container>
      <Paper elevation={5} className={styles.paperStyle}>
        <form noValidate autoComplete="off">
          <Grid>
            <h3 className={styles.inputLabel}>NUS Email:</h3>
            <TextField
              variant="outlined"
              className={styles.textWidth}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Grid>
          <Grid>
            <h3 className={styles.inputLabel}>Password:</h3>
            <TextField
              variant="outlined"
              type="password"
              className={styles.textWidth}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Grid>
          <Grid className={styles.rowGap}>
            <Button
              variant="contained"
              className={`${styles.loginButtonGap} ${styles.loginButton}`}
              onClick={null}
            >
              Login
            </Button>
            <Button
              variant="contained"
              className={`${styles.signupButtonGap} ${styles.signUpButton}`}
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
  );
}

export default LoginForm;
