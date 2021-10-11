// Import settings
import React from 'react'; 

// Import Material-ui
import { 
  Avatar,
  Button,
  Grid
} from '@material-ui/core';

// Import CSS 
import styles from './ProfilePicture.module.css';

function ProfilePicture() { 
  return (
    <Grid >
      <Grid>
        <Avatar className={styles.image}/>
      </Grid>
      <Grid className="center-text">
        <Button 
          variant="contained" 
          component="label" 
          className={styles.editPictureButton}
        >
          Change Photo
          <input hidden type="file"/>
        </Button>
      </Grid>
    </Grid>
  )
}

export default ProfilePicture; 
