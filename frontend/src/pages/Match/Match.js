import React from 'react';

//Material-ui
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

//FontAwesome
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

//Components
import Navbar from '../../components/Navbar/Navbar.js';
import MatchInterest from '../../components/MatchInterest/MatchInterest.js';
import PageTitle from '../../components/PageTitle/PageTitle.js';

//CSS
import styles from './Match.module.css';

function Match() {
    const gender = ['Male', 'Female'];
    const sport = ['Running', 'Basketball', 'Soccer', 'Badminton', 'Swimming', 'Squash', 'Volleyball', 'Floorball', 'Table Tennis', 'Frisbee', 'Handball', 'Tennis'];
    const art = ['Photography', 'Videography', 'Drawing', 'Painting'];
    const music = ['Pop', 'Jazz', 'Rock', 'EDM', 'Lofi', 'Disco'];
    const faculty = ['Engineering', 'Computing', 'Science', 'Business', 'Law', 'Dentistry', 'Music', 'Medicine', 'Design & Environment', 'Arts & Social Science'];

    return (
        <div>
            <Navbar/>
            <Container className={styles.allFont}>
                <PageTitle title={'Match'} icon={faUserFriends}/>
                <h2>Choose your match requirements:</h2>
                <Grid 
                    container 
                    spacing={2} 
                    alignItems='center'
                    justifyContent='center'
                >
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
                        <MatchInterest title={'Sport'} items={sport}/>
                    </Grid>
                    <Grid item md={6}>
                        <MatchInterest title={'Faculty'} items={faculty}/>
                    </Grid>
                    <Tooltip 
                        title={<h2>Note: You will be matched with anyone if no interest is selected.</h2>}
                        className={null}
                    >
                        <Button variant="contained" className={styles.matchButton}>
                            Match
                        </Button>
                    </Tooltip>
                </Grid>
            </Container>
        </div>
    )
}

export default Match;