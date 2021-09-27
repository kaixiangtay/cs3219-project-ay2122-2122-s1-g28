// Import settings
import React from 'react'; 

// Import Material-ui
import { 
  Avatar,
  Button
} from '@material-ui/core';

// Import CSS 
import styles from './ProfilePicture.module.css';

function ProfilePicture() { 
  return (
    <div className={styles.pictureContainer}>
      <Avatar className={styles.image}/>
      <Button className={styles.editPictureButton}>
        Change Profile Picture
      </Button>
    </div>
  )
}

export default ProfilePicture; 
