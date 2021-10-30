// Import Settings
import React, { useState } from "react";

// Import Redux
import { useSelector } from "react-redux";

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
import defaultProfileImage from "../../resources/NUSocialLife_Default_Profile.png";

// Import CSS
import styles from "./VideoPlayer.module.css";

function VideoPlayer({ myVideo, matchedVideo }) {
  const [webcam, setWebcam] = useState(true);
  const [mic, setMic] = useState(true);

  // const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

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

  return (
    <Grid>
      <Grid>
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
