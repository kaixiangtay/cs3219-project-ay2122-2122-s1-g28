// Import settings
import React, { useState, useEffect } from "react";

// import Redux
import { handleProfileRetrieval } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

// Import Material-ui
import { Button, Container, Grid, TextField } from "@material-ui/core";

// Import CSS
import styles from "./ProfileForm.module.css";

function ProfileForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleProfileRetrieval("61653498d37604ad124a721d")); //Hardcode _id for now
    setEmail(auth.user.email);
    setName(auth.user.name);
    setCurrentPassword("");
    setNewPassword("");
  }, []);

  return (
    <Container className="primary-font">
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item md={12}>
          <h2>Account Information</h2>
          <h3>Email</h3>
          <TextField
            disabled
            variant="outlined"
            size="small"
            value={email}
            className={styles.inputBox}
          />
        </Grid>
        <Grid item md={12}>
          <h3>Name</h3>
          <TextField
            required
            variant="outlined"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={styles.inputBox}
          />
        </Grid>
        <Grid item md={12}>
          <h3>New Password</h3>
          <TextField
            required
            variant="outlined"
            size="small"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
