// Import settings
import React from "react";
// import { toast } from "react-toastify";

// Import Material-ui
import { Button, Container, Grid, TextField } from "@material-ui/core";

// Import CSS
import styles from "./ProfileForm.module.css";

function ProfileForm() {
  return (
    <Container className="primary-font">
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item md={12}>
          <h2>Account Information</h2>
          <h3>Email</h3>
          <TextField
            required
            variant="outlined"
            size="small"
            className={styles.inputBox}
          />
        </Grid>
        <Grid item md={12}>
          <h3>Username</h3>
          <TextField
            required
            variant="outlined"
            size="small"
            className={styles.inputBox}
          />
        </Grid>
        <Grid item md={12}>
          <h2>Change Password</h2>
          <h3>Current Password</h3>
          <TextField
            required
            variant="outlined"
            size="small"
            className={styles.inputBox}
          />
        </Grid>
        <Grid item md={12}>
          <h3>New Password</h3>
          <TextField
            required
            variant="outlined"
            size="small"
            className={styles.inputBox}
          />
        </Grid>
        <Grid item md={12} className={styles.buttonContainer}>
          <Button className="red-button">Delete Account</Button>
          <Button className="green-button">Save Changes</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfileForm;
