import React, {useState} from 'react';

//Material-ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//CSS
import styles from './MatchInterest.module.css';

function MatchInterest({title, items}) {
    const [selection, setSelection] = useState([]);

    const handleSelection = (item) => {
        if (selection.includes(item)) {
            setSelection(selection.filter(selectedItem => selectedItem !== item));
        } else {
            setSelection(prevArray => [...prevArray, item]);
        }
    }

    return(
        <div className={styles.div}>
            <Grid item md={12}>
                <h2>{title}</h2>
            </Grid>
            {
                items.map((item) => (
                    <Button variant="contained" className={selection.includes(item) ? styles.buttonSelected : styles.buttonUnselected} onClick={() => handleSelection(item)}>
                        {item}
                    </Button>
                ))
            }
        </div>
    )
}

export default MatchInterest;