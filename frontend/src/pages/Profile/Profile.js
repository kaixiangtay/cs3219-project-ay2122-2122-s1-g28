// Import Settings
import React from 'react';

// Import Components
import Navbar from '../../components/Navbar/Navbar.js';
import ProfileForm from '../../components/ProfileForm/ProfileForm.js';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture.js';

// Import CSS 
import styles from './Profile.module.css'; 

function Profile() { 
  return (
    <div>
      <Navbar/> 
      <div className={styles.container}>
        <ProfilePicture/>
        <ProfileForm/>
      </div>
    </div>
  )
}

export default Profile; 
