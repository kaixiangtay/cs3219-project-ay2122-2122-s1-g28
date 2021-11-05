// Import Settings
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// Import Redux
import { signupReset } from "../../actions/signup";
import { navigationReset } from "../../actions/navigation";
import { profileReset } from "../../actions/profile";
import { useDispatch, useSelector } from "react-redux";

// Import Material-ui
import { Container, Grid } from "@material-ui/core";

// Import Components
import LoginForm from "../../components/LoginForm/LoginForm.js";

// Import Resources
import NUSociaLifeLogo from "../../resources/NUSociaLife_Login_Logo.png";

// CSS
import styles from "./Login.module.css";

function Login() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signupReset());
    dispatch(navigationReset());
    dispatch(profileReset());
  }, [dispatch]);

  if (auth.token) {
    return <Redirect to="/findfriends" />;
  }

  return (
    <div>
      <Container>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          className="empty-navbar-gap"
        >
          <Grid item md={6}>
            <img
              alt="NUSociaLifeLogo"
              src={NUSociaLifeLogo}
              className={styles.logo}
            />
          </Grid>
          <Grid item md={6} xs={12} sm={12}>
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Login;
