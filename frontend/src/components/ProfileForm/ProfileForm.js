// Import settings
import React, { useState, useEffect } from "react";

// import Redux
import {
  handleProfileRetrieval,
  handleProfileUpdate,
  handleDeleteAccount,
} from "../../actions/auth";
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
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //Hardcoded token for now until login feature implemented
  const _token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY4NGM5YTRiZjBlMmYwNTI0Y2E5ZTQiLCJpYXQiOjE2MzQyMjUzMjYsImV4cCI6MTYzNDMxMTcyNn0.ivTDFkSblN_q6eGF14YwESx5RE9y0zAUGB74HzMedew";

  useEffect(() => {
    dispatch(handleProfileRetrieval(_token));
    setEmail(auth.user.email);
    setName(auth.user.name);
    setNewPassword("");
    setChangePassword(false);
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
        <Grid item md={12} className={styles.buttonContainer}>
          <Button
            className="red-button"
            onClick={() => dispatch(handleDeleteAccount(_token))}
          >
            Delete Account
          </Button>
          <Button
            className="green-button"
            onClick={() =>
              dispatch(handleProfileUpdate(name, newPassword, changePassword))
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
