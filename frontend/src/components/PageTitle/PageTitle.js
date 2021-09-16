import React from 'react';

//Material-ui
import Grid from '@material-ui/core/Grid';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//CSS
import styles from './PageTitle.module.css';

function PageTitle({title, icon}) {
    return (
        <Grid item md={12} className={styles.color}>
            <h1>{title} <FontAwesomeIcon icon={icon} /></h1>
        </Grid>
    )
}

export default PageTitle;