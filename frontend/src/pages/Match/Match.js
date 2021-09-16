import React from 'react';

//Material-ui
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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
                    <Grid 
                        container 
                        item 
                        md={12} 
                        direction='column' 
                        spacing={3}
                        className={styles.buttonGroup} 
                    >
                        <Grid item>
                            <Button variant="contained" className={styles.matchAnyone}>
                                Match Anyone
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" className={styles.matchByInterest}>
                                Match by interest
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Match;