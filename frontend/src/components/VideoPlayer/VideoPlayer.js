// Import Settings
import React, { useState } from "react";

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

// Import Resources (Simulate Video, remove when implementing socket.io)
import Profile from "../../resources/Profile.png";
import NUSociaLife_Login_logo from "../../resources/NUSociaLife_Login_Logo.png";

// Import CSS
import styles from "./VideoPlayer.module.css";

function VideoPlayer() {
  const [webcam, setWebcam] = useState(false);
  const [mic, setMic] = useState(false);

  const handleWebCam = () => {
    setWebcam(!webcam);
  };

  const handleMic = () => {
    setMic(!mic);
  };

  return (
    <Grid>
      <Grid>
        <img alt="Profile1" src={Profile} className={styles.videoSize} />
      </Grid>
      <Grid>
        <img
          alt="Profile2"
          src={webcam ? Profile : NUSociaLife_Login_logo}
          className={styles.videoSize}
        />
        <div>
          <IconButton onClick={handleMic} className={styles.videoSettingButton}>
            <FontAwesomeIcon icon={mic ? faMicrophone : faMicrophoneSlash} />
          </IconButton>
          <IconButton
            onClick={handleWebCam}
            className={styles.videoSettingButton}
          >
            <FontAwesomeIcon icon={webcam ? faVideo : faVideoSlash} />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
}

// Use video tag when bringing in socket.io in the future
// <video playsInline muted ref={null} autoPlay className={styles.videoSize}/>

export default VideoPlayer;
