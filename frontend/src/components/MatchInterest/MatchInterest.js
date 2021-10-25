// Import Settings
import React, { useState } from "react";
import PropTypes from "prop-types";

// import Redux
import { updateInterests } from "../../actions/match";
import { useDispatch } from "react-redux";

// Import Material-ui
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// Import CSS
import styles from "./MatchInterest.module.css";

function MatchInterest({ title, category, items }) {
  const [selection, setSelection] = useState([]);

  const dispatch = useDispatch();

  const handleSelection = (item) => {
    let updatedSelection;
    if (selection.includes(item)) {
      updatedSelection = selection.filter(
        (selectedItem) => selectedItem !== item
      );
      setSelection(updatedSelection);
    } else {
      updatedSelection = [...selection, item];
      setSelection(updatedSelection);
    }
    dispatch(updateInterests(category, updatedSelection));
  };

  return (
    <div className={styles.div}>
      <Grid item md={12}>
        <h2>{title}</h2>
      </Grid>
      {items.map((item) => (
        <Button
          key={item}
          variant="contained"
          className={
            selection.includes(item)
              ? styles.buttonSelected
              : styles.buttonUnselected
          }
          onClick={() => handleSelection(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}

MatchInterest.propTypes = {
  title: PropTypes.string,
  key: PropTypes.number,
  items: PropTypes.array,
};

export default MatchInterest;
