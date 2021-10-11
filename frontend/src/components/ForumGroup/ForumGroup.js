// Import Settings
import React from 'react';
import { Redirect } from "react-router-dom";

// Import Material-ui
import { 
  Button
} from '@material-ui/core';

// Import CSS
import styles from './ForumGroup.module.css';

function ForumGroup(props) { 
  const { title } = props; 
  
  const handleOnClick = () => { 
    const path = '/forum/' + title; 
    console.log('path: ', path)
    return <Redirect to={path}/>
  }; 

  return (
      <Button 
        className={styles.button}
        onClick={handleOnClick}
      >
        {title}
      </Button>
  )
}

export default ForumGroup; 
