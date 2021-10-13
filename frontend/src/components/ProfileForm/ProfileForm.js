// Import settings
import React, { useState, useEffect } from "react";

// import Redux
import { handleProfileRetrieval } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

// Import Material-ui
import {
  Button,
  Container,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";

// Import CSS
import styles from "./ProfileForm.module.css";

function ProfileForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let _id = "61653498d37604ad124a721d"; //Hardcode _id for now

  useEffect(() => {
    dispatch(handleProfileRetrieval(_id)); //Hardcode _id for now
    setEmail(auth.user.email);
    setName(auth.user.name);
    setOldPassword("");
    setNewPassword("");
    setChangePassword(false);
  }, []);

  // const handleSaveChanges = () => {}; call update profile, call change password, perform check if verify password = new password in actions

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
          <RadioGroup
            row
            value={changePassword}
            onChange={() => setChangePassword(!changePassword)}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
          {changePassword ? (
            <div>
              <h3>Enter Old</h3>
              <TextField
                required
                variant="outlined"
                size="small"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={styles.inputBox}
              />
              <h3>New Password</h3>
              <TextField
                required
                variant="outlined"
                size="small"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.inputBox}
              />
              <h3>Re-enter New Password</h3>
              <TextField
                required
                variant="outlined"
                size="small"
                type="password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                className={styles.inputBox}
              />
            </div>
          ) : (
            <div />
          )}
        </Grid>
        <Grid item md={12} className={styles.buttonContainer}>
          <Button className="red-button">Delete Account</Button>
          <Button className="green-button" onClick={null}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfileForm;
