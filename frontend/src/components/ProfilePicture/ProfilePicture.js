// Import settings
import React from "react";

// import Redux
import { handleProfileImageUpload } from "../../actions/profile";
import { useDispatch, useSelector } from "react-redux";

// Import Material-ui
import { Avatar, Button, Grid } from "@material-ui/core";

// Import CSS
import styles from "./ProfilePicture.module.css";

function ProfilePicture() {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <Grid>
      <Grid>
        <Avatar src={profile.data.profileImageUrl} className={styles.image} />
      </Grid>
      <Grid className="center-text">
        <Button
          variant="contained"
          component="label"
          className={styles.editPictureButton}
        >
          Change Photo
          <input
            hidden
            type="file"
            onChange={(e) =>
              dispatch(handleProfileImageUpload(auth.token, e.target.value))
            }
          />
        </Button>
      </Grid>
    </Grid>
  );
}

export default ProfilePicture;
