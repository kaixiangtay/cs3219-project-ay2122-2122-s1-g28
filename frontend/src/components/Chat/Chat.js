// Import Settings
import React, { useState, useEffect } from "react";

// import Redux
import {
  handleUnmatch,
  handleMatchDisconnect,
  initiateSocket,
  listenForDisconnect,
  disconnectSocket,
  socket,
} from "../../actions/match";
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

// Import resources
import defaultProfilePicture from "../../resources/NUSocialLife_Default_Profile.png";

// Import CSS
import styles from "./Chat.module.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [matchedDisplayPic, setMatchedDisplayPic] = useState("");
  const [matchedName, setMatchedName] = useState("");

  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const match = useSelector((state) => state.match);

  const dispatch = useDispatch();

  useEffect(() => {
    initiateSocket(match.data.roomId);

    socket.on("profileRequest", () => {
      socket.emit("profileRetrieval", {
        token: auth.token,
        profile: profile.data,
      });
    });

    socket.on("profileRetrieval", (data) => {
      if (data.token != auth.token) {
        setMatchedName(data.profile.name);
        setMatchedDisplayPic(data.profile.profileImageUrl);
      }
    });

    listenForDisconnect((err, data) => {
      if (err) {
        console.log("err in disconnecting");
        disconnectSocket();
        return;
      }
      if (data) {
        console.log("Someone disconnected");
        dispatch(handleMatchDisconnect());
      }
    });
  }, []);

  useEffect(() => {
    socket.on("chat", (data) => {
      if (data.token !== auth.token) {
        setMessages([
          ...messages,
          { token: data.token, message: data.message },
        ]);
      }
    });
  }, [messages]);

  return (
    <Container className="primary-font">
      <Grid container spacing={2}>
        <Grid item md={12} className="center-text">
          <PageTitle title={"Find Friends"} icon={faUserFriends} />
        </Grid>
        <Grid container item md={12} className={styles.parentGrid}>
          <Grid item md={12} className="center-text">
            <h2>You have matched with {matchedName}!</h2>
          </Grid>
          <Grid item md={9} className={styles.chatSection}>
            <ChatMessage messages={messages} setMessages={setMessages} />
          </Grid>
          <Grid
            direction="column"
            container
            item
            md={3}
            className={`center-text ${styles.profilePictureSection}`}
          >
            <Grid>
              <Grid>
                <img
                  alt="Profile1"
                  src={
                    matchedDisplayPic === ""
                      ? defaultProfilePicture
                      : matchedDisplayPic
                  }
                  className={styles.profilePicture}
                />
              </Grid>
              <Grid>
                <img
                  alt="Profile2"
                  src={
                    profile.data.profileImageUrl === ""
                      ? defaultProfilePicture
                      : profile.data.profileImageUrl
                  }
                  className={styles.profilePicture}
                />
              </Grid>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                className="red-button"
                onClick={() => {
                  dispatch(handleUnmatch(auth.token));
                }}
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
