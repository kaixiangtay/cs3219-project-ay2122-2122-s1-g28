import React from 'react';

//Material-ui
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

//FontAwesome
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

//Components
import PageTitle from '../PageTitle/PageTitle.js';

//CSS
import styles from './SearchMatch.module.css';

function SearchMatch({ setLoading }) {
    return (
        <Container className={styles.allFont}>
            <Grid 
                container 
                spacing={2} 
                alignItems='center'
                justifyContent='center'
            >
                <Grid item md={12} className={styles.centerText}>
                    <PageTitle title={'Find Friends'} icon={faUserFriends}/>
                    <h2>We are finding a new friend for you, give us some time!</h2>
                    <CircularProgress color="inherit" className={styles.spinner} size={300}/>
                </Grid>
                <Button variant="contained" className={styles.cancelMatchButton} onClick={() => setLoading(false)}>
                    Cancel Matching
                </Button>
            </Grid>
        </Container>
    );
}

export default SearchMatch;