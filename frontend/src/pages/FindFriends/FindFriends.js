import React, {useState} from 'react';

//Material-ui
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

//FontAwesome
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

//Components
import Chat from '../../components/Chat/Chat.js';
import Navbar from '../../components/Navbar/Navbar.js';
import MatchInterest from '../../components/MatchInterest/MatchInterest.js';
import PageTitle from '../../components/PageTitle/PageTitle.js';
import SearchMatch from '../../components/SearchMatch/SearchMatch.js';

//Constants 
import {
    GENDER,
    SPORT,
    ART,
    MUSIC,
    FACULTY,
    UNMATCHED,
    LOADING,
    MATCHED
} from '../../constants/FindFriendsConstants'

//CSS
import styles from './FindFriends.module.css';

function FindFriends() {
    const [matchState, setMatchState] = useState(UNMATCHED);

    const handleMatchState = (state) => {
        setMatchState(state)
    }

    const findFriendsJsx = (
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
                    <MatchInterest title={'Gender'} items={GENDER}/>
                </Grid>
                <Grid item md={4}>
                    <MatchInterest title={'Art'} items={ART}/>
                </Grid>
                <Grid item md={4}>
                    <MatchInterest title={'Music'} items={MUSIC}/>
                </Grid>
                <Grid item md={6}>
                    <MatchInterest title={'Sport'} items={SPORT}/>
                </Grid>
                <Grid item md={6}>
                    <MatchInterest title={'Faculty'} items={FACULTY}/>
                </Grid>
                <Tooltip 
                    title={<h2>Note: You will be matched with anyone if no interest is selected.</h2>}
                    className={null}
                >
                    <Button variant="contained" className={styles.matchButton} onClick={() => handleMatchState(LOADING)}>
                        Match
                    </Button>
                </Tooltip>
            </Grid>
        </Container>
    );

    return (
        <div>
            <Navbar/>
            {   
                matchState === UNMATCHED 
                    ? findFriendsJsx
                    : matchState === LOADING 
                        ? <SearchMatch handleMatchState={handleMatchState}/>
                        : matchState === MATCHED
                            ? <Chat handleMatchState={handleMatchState}/>
                            : null
            }
        </div>
    )
}

export default FindFriends;