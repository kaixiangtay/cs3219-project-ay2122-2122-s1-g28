// Import Settings
import React, { useState, useEffect } from "react";

// import Redux
import {
  handleUnmatch,
  handleMatchDisconnect,
  initiateSocket,
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
import defaultProfilePicture from "../../resources/NUSociaLife_Logo.png";

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

    // Request for matched party's profile
    socket.on("profileRequest", () => {
      socket.emit("profileRetrieval", {
        roomId: match.data.roomId,
        token: auth.token,
        profile: profile.data,
      });
    });

    // Receive matched party's profile
    socket.on("profileRetrieval", (data) => {
      const { roomId, token, profile } = data;
      if (roomId === match.data.roomId && token != auth.token) {
        setMatchedName(profile.name);
        setMatchedDisplayPic(profile.profileImageUrl);
      }
    });

    socket.on("chat", (data) => {
      const { roomId, token, message } = data;
      if (data && roomId === match.data.roomId && token !== auth.token) {
        setMessages((oldMessages) => [
          ...oldMessages,
          { token: token, message: message },
        ]);
      }
    });

    // When match party leaves the room
    socket.on("leave", (data) => {
      let roomId = data;
      if (roomId === match.data.roomId) {
        dispatch(handleMatchDisconnect());
      }
    });
  }, []);

  return (
    <Container className="primary-font">
      <Grid container>
        <Grid item sm={12} className="center-text">
          <PageTitle title={"Find Friends"} icon={faUserFriends} />
        </Grid>
        <Grid container item sm={12} className={styles.parentGrid}>
          <Grid item sm={12} className="center-text">
            <h2>You have matched with {matchedName}!</h2>
          </Grid>
          <Grid item sm={7} md={9} className={styles.chatSection}>
            <ChatMessage messages={messages} setMessages={setMessages} />
          </Grid>
          <Grid
            direction="column"
            container
            item
            sm={5}
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
                      : `${matchedDisplayPic}?timestamp=${new Date().getTime()}}`
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
                      : `${
                          profile.data.profileImageUrl
                        }?timestamp=${new Date().getTime()}}`
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
