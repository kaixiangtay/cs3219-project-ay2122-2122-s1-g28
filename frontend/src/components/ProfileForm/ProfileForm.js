// Import settings
import React from 'react';
// import { toast } from "react-toastify";

// Import Material-ui
import {
  Button,
  Container,
  Grid,
  TextField
} from '@material-ui/core';

// Import CSS
import styles from './ProfileForm.module.css';

function ProfileForm() {
  return (
    <Container>
      <Grid>
        <h2 className={styles.header}>ACCOUNT INFROMATION</h2>
        <div className={styles.inputRow}>
          <h3 className={styles.inputHeader}>Email</h3>
          <TextField
            required 
            variant="outlined"
            size="small"
            className={styles.inputBox}
          />
        </div>
        <div className={styles.inputRow}>
          <h3 className={styles.inputHeader}>Username</h3>
          <TextField
            required 
            variant="outlined"
            size="small"
            className={styles.inputBox}
          />
        </div>
      </Grid>
      <Grid className={styles.passwordContainer}>
        <h2 className={styles.header}>PASSWORD MANAGEMENT</h2>
        <div className={styles.inputRow}>
          <h3 className={styles.inputHeader}>Current Password</h3>
          <TextField
            required 
            variant="outlined"
            size="small"
            className={styles.inputBox}
          />
        </div>
        <div className={styles.inputRow}>
          <h3 className={styles.inputHeader}>New Password</h3>
          <TextField
            required 
            variant="outlined"
            size="small"
            className={styles.inputBox}
          />
        </div>
        <div className={styles.inputRow}>
          <h3 className={styles.inputHeader}>Confirm Password</h3>
          <TextField
            required 
            variant="outlined"
            size="small"
            className={styles.inputBox}
          />
        </div>
      </Grid>
      <Grid container className={styles.buttonContainer}>
        <Button className={styles.deleteButton}>
          Delete Account
        </Button>
        <Button className={styles.saveButton}>
          Save Changes
        </Button>
      </Grid>
    </Container>
  )
}
    

export default ProfileForm;
