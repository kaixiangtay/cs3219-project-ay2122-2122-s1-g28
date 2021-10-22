// Import Settings
import React from "react";
import PropTypes from "prop-types";

// import Redux
import { handleUnmatch } from "../../actions/match";
import { useDispatch } from "react-redux";

// Import Material-ui
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Import FontAwesome
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

// Import Components
import PageTitle from "../PageTitle/PageTitle.js";

// Import CSS
import styles from "./SearchMatch.module.css";

function SearchMatch() {
  const dispatch = useDispatch();

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
          onClick={() => dispatch(handleUnmatch())}
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
