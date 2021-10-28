// Import Settings
import React, { useState, useRef, useEffect } from "react";

// Import Redux
import {
  // streamVideo,
  listenForVideo,
  disconnectSocket,
} from "../../actions/match";
import { useSelector } from "react-redux";

// Import Peer
// import Peer from "simple-peer";

// Import Material-ui
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

// Import FontAwesome
import {
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Resources
import defaultProfileImage from "../../resources/NUSociaLife_Login_Logo.png";

// Import CSS
import styles from "./VideoPlayer.module.css";

function VideoPlayer({ myVideo }) {
  const [webcam, setWebcam] = useState(true);
  const [mic, setMic] = useState(false);

  const matchedVideo = useRef();

  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  // const peer = new Peer({
  //   initiator: true,
  //   stream: videoStream,
  // });

  const handleMute = () => {
    myVideo.current.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = !mic));
    setMic(!mic);
  };

  const handleWebcam = () => {
    myVideo.current.srcObject.getVideoTracks().forEach((track) => {
      track.enabled = !webcam;
    });
    setWebcam(!webcam);
  };

  useEffect(() => {
    listenForVideo((err, data) => {
      if (err) {
        disconnectSocket();
        return;
      }
      if (data.token != auth.token) {
        //peer.signal(data.signal);
      }
    });
  }, []);

  // peer.on("signal", (data) => {
  //   streamVideo(auth.token, data);
  // });

  // peer.on("stream", (stream) => {
  //   matchedVideo.current.srcObject = stream;
  // });

  return (
    <Grid>
      <Grid>
        {/* <img alt="Profile1" src={Profile} className={styles.videoSize} /> */}
        <video
          playsInline
          ref={matchedVideo}
          autoPlay
          className={styles.videoSize}
        />
      </Grid>
      <Grid>
        <img
          alt="Profile2"
          src={
            profile.data.profileImageUrl == ""
              ? defaultProfileImage
              : profile.data.profileImageUrl
          }
          className={
            webcam ? styles.videoOverlayFalse : styles.videoOverlayTrue
          }
        />
        <video
          playsInline
          ref={myVideo}
          poster={defaultProfileImage}
          autoPlay
          className={styles.videoSize}
        />
        <div>
          <IconButton
            onClick={() => handleMute()}
            className={styles.videoSettingButton}
          >
            <FontAwesomeIcon icon={mic ? faMicrophone : faMicrophoneSlash} />
          </IconButton>
          <IconButton
            onClick={() => handleWebcam()}
            className={styles.videoSettingButton}
          >
            <FontAwesomeIcon icon={webcam ? faVideo : faVideoSlash} />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
}

export default VideoPlayer;
