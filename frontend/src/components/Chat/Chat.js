import React from 'react';

//Material-ui
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

//FontAwesome
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

//Components
import PageTitle from '../PageTitle/PageTitle.js';

//Constants 
import { UNMATCHED } from '../../constants/FindFriendsConstants'

//Resources
import Profile from '../../resources/Profile.png';

//CSS
import styles from './Chat.module.css';

function Chat({ handleMatchState }) {
    const matchInfo = {
        name: 'John'
    }

    return (
        <Container className={styles.allFont}>
            <Grid 
                spacing={2} 
            >
                <Grid item md={12} className={styles.centerText}>
                    <PageTitle title={'Find Friends'} icon={faUserFriends}/>
                </Grid>
                <Grid container item md={12} className={styles.parentGrid}>
                    <Grid item md={12} className={styles.centerText}>
                        <h2>You have matched with {matchInfo.name}!</h2>
                    </Grid>
                    <Grid item md={9} className={styles.chat}>
                        <Paper elevation={3}>
                            <div>
                                <TextField label="Type your message here" variant="standard"/>
                                <Button variant="contained" className={styles.sendButton} onClick={null}>
                                    Send
                                </Button>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid direction='column' item md={3} className={`${styles.centerText} ${styles.video}`}>
                        <Grid>
                            <img alt='Profile1' src={Profile} className={styles.profileImage}/>
                        </Grid>
                        <Grid>
                            <img alt='Profile2' src={Profile} className={styles.profileImage}/>
                        </Grid> 
                        <Grid>
                            <Button variant="contained" className={styles.unmatchButton} onClick={() => handleMatchState(UNMATCHED)}>
                                Unmatch
                            </Button>
                        </Grid> 
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Chat;