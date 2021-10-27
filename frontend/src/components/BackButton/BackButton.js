// Import Settings
import React from "react";
import { useHistory } from "react-router-dom";

// Import Material-ui
import { Button } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBackIos";

// Import CSS
import styles from "./BackButton.module.css";

function BackButton() {
  const history = useHistory();

  return (
    <Button
      variant="outlined"
      onClick={() => history.goBack()}
      className={styles.button}
    >
      <BackIcon />
      Back
    </Button>
  );
}

export default BackButton;
