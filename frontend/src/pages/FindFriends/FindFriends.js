import React, {useState} from 'react';

//Material-ui
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

//FontAwesome
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

//Components
import Navbar from '../../components/Navbar/Navbar.js';
import MatchInterest from '../../components/MatchInterest/MatchInterest.js';
import PageTitle from '../../components/PageTitle/PageTitle.js';

//Constants 
import {
    gender,
    sports,
    art,
    music,
    faculty
} from '../../constants/FindFriendsConstants'

//CSS
import styles from './FindFriends.module.css';

function FindFriends() {
    const [loading, setLoading] = useState(false);

    const handleMatch = () => {
        if (loading) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }
    
    const loadingJsx = (
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
                <Button variant="contained" className={styles.cancelMatchButton} onClick={() => handleMatch()}>
                    Cancel Matching
                </Button>
            </Grid>
            
        </Container>
    );
    
    const matchJsx = (
        <Container className={styles.allFont}>
            <Grid 
                container 
                spacing={2} 
                alignItems='center'
                justifyContent='center'
            >
                <Grid item md={12} className={styles.centerText}>
                    <PageTitle title={'Find Friends'} icon={faUserFriends}/>
                    <h2>Choose your match requirements:</h2>
                </Grid>
                <Grid item md={4}>
                    <MatchInterest title={'Gender'} items={gender}/>
                </Grid>
                <Grid item md={4}>
                    <MatchInterest title={'Art'} items={art}/>
                </Grid>
                <Grid md={4}>
                    <MatchInterest title={'Music'} items={music}/>
                </Grid>
                <Grid item md={6}>
                    <MatchInterest title={'Sports'} items={sports}/>
                </Grid>
                <Grid item md={6}>
                    <MatchInterest title={'Faculty'} items={faculty}/>
                </Grid>
                <Tooltip 
                    title={<h2>Note: You will be matched with anyone if no interest is selected.</h2>}
                    className={null}
                >
                    <Button variant="contained" className={styles.matchButton} onClick={() => handleMatch()}>
                        Match
                    </Button>
                </Tooltip>
            </Grid>
        </Container>
    );

    return (
        <div>
            <Navbar/>
            {loading ? loadingJsx : matchJsx}
        </div>
    )
}

export default FindFriends;