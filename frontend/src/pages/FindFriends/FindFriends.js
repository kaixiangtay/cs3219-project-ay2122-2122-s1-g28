// Import Settings
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// import Redux
import { handleNavigation } from "../../actions/navigation";
import {
  handleMatchWithRetry,
  resetInterests,
  handleUnmatch,
} from "../../actions/match";
import { handleProfileRetrieval } from "../../actions/profile";
import { useDispatch, useSelector } from "react-redux";

// Import Material-ui
import { Button, Container, Grid, Tooltip } from "@material-ui/core";

// Import FontAwesome
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

// Import Components
import Chat from "../../components/Chat/Chat.js";
import Navbar from "../../components/Navbar/Navbar.js";
import MatchInterest from "../../components/MatchInterest/MatchInterest.js";
import PageTitle from "../../components/PageTitle/PageTitle.js";
import SearchMatch from "../../components/SearchMatch/SearchMatch.js";

// Import Constants
import {
  GENDER,
  SPORT,
  ART,
  MUSIC,
  FACULTY,
  GENDER_ITEMS,
  SPORT_ITEMS,
  ART_ITEMS,
  MUSIC_ITEMS,
  FACULTY_ITEMS,
} from "../../constants/FindFriendsConstants";
import { FINDFRIENDS } from "../../constants/ReduxConstants";

// Import Resources
import SideDesign from "../../resources/Side-Design.png";

function FindFriends() {
  const auth = useSelector((state) => state.auth);
  const match = useSelector((state) => state.match);
  const dispatch = useDispatch();

  // Update navigation state when user returns to this page from previous page
  useEffect(() => {
    dispatch(handleNavigation(FINDFRIENDS));
    dispatch(resetInterests());
    dispatch(handleProfileRetrieval(auth.token));
    dispatch(handleUnmatch(auth.token));
  }, []);

  if (!auth.token) {
    return <Redirect to="/login" />;
  }

  const findFriendsJsx = (
    <Container className="primary-font">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} className="center-text">
          <PageTitle title={"Find Friends"} icon={faUserFriends} />
          <h2>Choose your match requirements:</h2>
        </Grid>
        <Grid item xs={12} md={4}>
          <MatchInterest
            title={"Gender"}
            category={GENDER}
            items={GENDER_ITEMS}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MatchInterest title={"Art"} category={ART} items={ART_ITEMS} />
        </Grid>
        <Grid item xs={12} md={4}>
          <MatchInterest title={"Music"} category={MUSIC} items={MUSIC_ITEMS} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MatchInterest title={"Sport"} category={SPORT} items={SPORT_ITEMS} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MatchInterest
            title={"Faculty"}
            category={FACULTY}
            items={FACULTY_ITEMS}
          />
        </Grid>
        <Grid item>
          <Tooltip
            title={
              <h2>
                Note: You will be matched with anyone if no interest is
                selected.
              </h2>
            }
          >
            <Button
              variant="contained"
              className="orange-button"
              onClick={() =>
                dispatch(handleMatchWithRetry(auth.token, match.interests))
              }
            >
              Match
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <div>
      <Navbar />
      <img alt="SideDesign" src={SideDesign} className={"sideDesignLeft"} />
      <img alt="SideDesign" src={SideDesign} className={"sideDesignRight"} />
      {match.matching ? (
        <SearchMatch />
      ) : match.matchedSuccess ? (
        <Chat />
      ) : (
        findFriendsJsx
      )}
    </div>
  );
}

export default FindFriends;
