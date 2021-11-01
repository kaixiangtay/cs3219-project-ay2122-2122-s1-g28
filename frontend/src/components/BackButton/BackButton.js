// Import Settings
import React from "react";

// Import Material-ui
import { Button } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBackIos";

// Import CSS
import styles from "./BackButton.module.css";

function BackButton(props) {
  const { handleOnBack } = props;

  return (
    <Button
      variant="outlined"
      onClick={() => handleOnBack()}
      className={styles.button}
    >
      <BackIcon />
      Back
    </Button>
  );
}

export default BackButton;
