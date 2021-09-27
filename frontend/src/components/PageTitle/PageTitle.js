import React from 'react';

//Material-ui
import Grid from '@material-ui/core/Grid';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PageTitle({title, icon}) {
    return (
        <Grid item md={12} className="primary-font">
            <h1>{title} <FontAwesomeIcon icon={icon} /></h1>
        </Grid>
    )
}

export default PageTitle;