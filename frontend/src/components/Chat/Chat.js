// Import Settings
import React, { useState, useRef, useEffect } from "react";

// Import Peer
//import Peer from "simple-peer"

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
import VideoPlayer from "../VideoPlayer/VideoPlayer.js";

// Import CSS
import styles from "./Chat.module.css";

function Chat() {
  const [messages, setMessages] = useState([]);

  // Video Call
  const myVideo = useRef();
  const matchedVideo = useRef();

  const auth = useSelector((state) => state.auth);
  const match = useSelector((state) => state.match);

  const dispatch = useDispatch();

  const startVideoStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });
  };

  const stopVideoStream = () => {
    if (myVideo.current) {
      myVideo.current.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    }
    // if (matchedVideo.current) {
    //   matchedVideo.current.srcObject.getTracks().forEach((track) => {
    //     track.stop();
    //   });
    // }
  };

  // const callPeer = () => {};

  // const receivePeer = () => {};

  useEffect(() => {
    initiateSocket(match.data.roomId, auth.token);

    listenForDisconnect((err, data) => {
      if (err) {
        console.log("err in disconnecting");
        disconnectSocket();
        return;
      }
      if (data) {
        console.log("Someone disconnected");
        stopVideoStream();
        dispatch(handleMatchDisconnect());
      }
    });

    // socket.on("roomSize", (data) => {
    //   if (data.roomSize === 1 && auth.token !== data.token) {
    //     callPeer();
    //     console.log(data);
    //   } else if (data.roomSize === 2 && auth.token !== data.token) {
    //     receivePeer();
    //     console.log(data);
    //   }
    // });

    startVideoStream();
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
            <h2>You have matched with a new friend!</h2>
          </Grid>
          <Grid item md={9} className={styles.chatSection}>
            <ChatMessage messages={messages} setMessages={setMessages} />
          </Grid>
          <Grid
            direction="column"
            container
            item
            md={3}
            className={`center-text ${styles.videoSection}`}
          >
            <Grid>
              <VideoPlayer myVideo={myVideo} matchedVideo={matchedVideo} />
            </Grid>
            <Grid>
              <Button
                variant="contained"
                className="red-button"
                onClick={() => {
                  stopVideoStream();
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
