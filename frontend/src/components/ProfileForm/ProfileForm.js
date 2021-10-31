// Import settings
import React, { useState, useEffect } from "react";

// import Redux
import {
  handleProfileRetrieval,
  handleProfileUpdate,
  handleDeleteAccount,
} from "../../actions/profile";
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
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleProfileRetrieval(auth.token));
  }, []);

  useEffect(() => {
    if (profile.profileRetrieveSuccess) {
      setEmail(profile.data.email);
      setName(profile.data.name);
    }
    setNewPassword("");
    setChangePassword(false);
  }, [profile]);

  return (
    <Container className="primary-font">
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item sm={12}>
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
        <Grid item sm={12}>
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
        <Grid item sm={12}>
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
            </div>
          ) : (
            <div />
          )}
        </Grid>
        <Grid item sm={12} className={styles.buttonContainer}>
          <Button
            className="red-button"
            onClick={() => dispatch(handleDeleteAccount(auth.token))}
          >
            Delete Account
          </Button>
          <Button
            className="green-button"
            onClick={() =>
              dispatch(
                handleProfileUpdate(
                  auth.token,
                  name,
                  newPassword,
                  changePassword
                )
              )
            }
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfileForm;
