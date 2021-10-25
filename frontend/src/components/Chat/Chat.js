// Import Settings
import React from "react";

// import Redux
import { handleUnmatch } from "../../actions/match";
import { useDispatch, useSelector } from "react-redux";

// Import Material-ui
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Import FontAwesome
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

// Import Components
import ChatMessage from "../ChatMessage/ChatMessage.js";
import PageTitle from "../PageTitle/PageTitle.js";
import VideoPlayer from "../VideoPlayer/VideoPlayer.js";

// Import CSS
import styles from "./Chat.module.css";

function Chat() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Container className="primary-font">
      <Grid container spacing={2}>
        <Grid item md={12} className="center-text">
          <PageTitle title={"Find Friends"} icon={faUserFriends} />
        </Grid>
        <Grid container item md={12} className={styles.parentGrid}>
          <Grid item md={12} className="center-text">
            <h2>You have matched with a new friend!</h2>
          </Grid>
          <Grid item md={9} className={styles.chatSection}>
            <ChatMessage />
          </Grid>
          <Grid
            direction="column"
            container
            item
            md={3}
            className={`center-text ${styles.videoSection}`}
          >
            <Grid>
              <VideoPlayer />
            </Grid>
            <Grid>
              <Button
                variant="contained"
                className="red-button"
                onClick={() => dispatch(handleUnmatch(auth.token))}
              >
                Unmatch
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chat;
