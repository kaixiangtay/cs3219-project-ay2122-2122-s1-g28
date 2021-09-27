// Import Settings
import React, { useState } from 'react';

// Import Material-ui
import { 
    Button, 
    Container, 
    Grid, 
    Tooltip 
} from '@material-ui/core';

// Import FontAwesome
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

// Import Components
import Chat from '../../components/Chat/Chat.js';
import Navbar from '../../components/Navbar/Navbar.js';
import MatchInterest from '../../components/MatchInterest/MatchInterest.js';
import PageTitle from '../../components/PageTitle/PageTitle.js';
import SearchMatch from '../../components/SearchMatch/SearchMatch.js';

// Import Constants 
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

function FindFriends() {
    const [matchState, setMatchState] = useState(UNMATCHED);

    const handleMatchState = (state) => {
        setMatchState(state)
    }

    const findFriendsJsx = (
        <Container className="primary-font">
            <Grid 
                container 
                spacing={2} 
                alignItems='center'
                justifyContent='center'
            >
                <Grid item md={12} className="center-text">
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
                    <Button variant="contained" className="green-button" onClick={() => handleMatchState(LOADING)}>
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