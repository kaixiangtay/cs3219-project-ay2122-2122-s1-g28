// Import settings
import React from "react";

// Import Material-ui
import { Avatar, Button, Grid } from "@material-ui/core";

// Import CSS
import styles from "./ProfilePicture.module.css";

function ProfilePicture() {
  return (
<<<<<<< HEAD
    <Grid >
=======
    <Grid direction="column">
>>>>>>> e51230ed4dbf413236b7383a90631db8c28916c2
      <Grid>
        <Avatar className={styles.image} />
      </Grid>
      <Grid className="center-text">
        <Button
          variant="contained"
          component="label"
          className={styles.editPictureButton}
        >
          Change Photo
          <input hidden type="file" />
        </Button>
      </Grid>
    </Grid>
  );
}

export default ProfilePicture;
