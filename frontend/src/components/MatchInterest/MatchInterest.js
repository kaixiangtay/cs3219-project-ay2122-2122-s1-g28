import React from 'react';

//Material-ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//CSS
import styles from './MatchInterest.module.css';

function MatchInterest({title, items}) {
    return(
        <div className={styles.div}>
            <Grid item md={12}>
                <h2>{title}</h2>
            </Grid>
            {
                items.map((item) => (
                    <Button variant="contained" className={styles.button}>
                        {item}
                    </Button>
                ))
            }
        </div>
    )
}

export default MatchInterest;