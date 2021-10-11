// Import Settings
import React from 'react';

// Import Material-ui
import {
  Grid
} from '@material-ui/core';

// Import FontAwesome
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';

// Import Components
import Navbar from '../../components/Navbar/Navbar.js';
import PageTitle from '../../components/PageTitle/PageTitle.js';
import ForumGroup from '../../components/ForumGroup/ForumGroup.js';

// Import CSS
import styles from './Forum.module.css';

function Forum() { 
  return (
    <div>
      <Navbar/> 
      <Grid item md={12} className="center-text">
        <PageTitle title={'Forum'} icon={faCommentAlt}/>
      </Grid>
      <Grid 
        container
        spacing={5} 
        className={styles.container}
      >
        <Grid item xs={4} sm={4} md={4}>
          <ForumGroup title={'academic'}/>
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <ForumGroup title={'admin'}/>
        </Grid>
        
        <Grid item xs={4} sm={4} md={4}>
          <ForumGroup title={'CCA'}/>
        </Grid>

        <Grid item xs={4} sm={4} md={4}>
          <ForumGroup title={'accomodation'}/>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <ForumGroup title={'tips'}/>
        </Grid>
        
        <Grid item xs={4} sm={4} md={4}>
          <ForumGroup title={'miscellaneous'}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Forum; 
