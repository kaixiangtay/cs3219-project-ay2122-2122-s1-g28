// Import Settings
import React from 'react';

// Import Material-ui
import { Container, Grid } from '@material-ui/core';

// Import FontAwesome
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

// Import Components
import Navbar from '../../components/Navbar/Navbar.js';
import PageTitle from '../../components/PageTitle/PageTitle.js';
import ProfileForm from '../../components/ProfileForm/ProfileForm.js';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture.js';

function Profile() { 
  return (
    <div>
      <Navbar/> 
      <Container>
        <Grid item md={12} className="center-text">
            <PageTitle title={'Profile'} icon={faUserCircle}/>
        </Grid>
        <Grid 
          container 
          spacing={2} 
        >
          <Grid item md={4}>
            <ProfilePicture/>
          </Grid>
          <Grid item md={8}>
            <ProfileForm/>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Profile; 
