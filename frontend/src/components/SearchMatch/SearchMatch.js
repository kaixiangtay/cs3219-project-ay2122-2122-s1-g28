// Import Settings
import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Import Material-ui
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Import FontAwesome
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

// Import Components
import PageTitle from "../PageTitle/PageTitle.js";

// Import Constants
import { UNMATCHED, MATCHED } from "../../constants/FindFriendsConstants";

// Import CSS
import styles from "./SearchMatch.module.css";

function SearchMatch({ handleMatchState }) {
  //Simulate successful matching of user after 3s for testing purpose
  useEffect(() => {
    setTimeout(() => {
      handleMatchState(MATCHED);
    }, 3000);
  }, [handleMatchState]);

  return (
    <Container className="primary-font">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item md={12} className="center-text">
          <PageTitle title={"Find Friends"} icon={faUserFriends} />
          <h2>We are finding a new friend for you, give us some time!</h2>
          <CircularProgress
            color="inherit"
            className={styles.spinner}
            size={300}
          />
        </Grid>
        <Button
          variant="contained"
          className="red-button"
          onClick={() => handleMatchState(UNMATCHED)}
        >
          Cancel Matching
        </Button>
      </Grid>
    </Container>
  );
}

SearchMatch.propTypes = {
  handleMatchState: PropTypes.func,
};

export default SearchMatch;
