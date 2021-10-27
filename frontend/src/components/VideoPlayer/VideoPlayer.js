// Import Settings
import React, { useState, useRef, useEffect } from "react";

// Import Redux
import // disconnectSocket,
// streamVideo,
// listenForVideo,
"../../actions/match";
// import { useSelector } from "react-redux";

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

// Import Resources (Simulate Video, remove when implementing socket.io)
// import Profile from "../../resources/Profile.png";

// Import CSS
import styles from "./VideoPlayer.module.css";

function VideoPlayer() {
  const [webcam, setWebcam] = useState(true);
  const [mic, setMic] = useState(false);
  //const [stream, setStream] = useState(null);
  const myVideo = useRef();
  const matchedVideo = useRef();

  // const auth = useSelector((state) => state.auth);
  // // const profile = useSelector((state) => state.profile);

  // const peer = new Peer({
  //   initiator: true,
  //   trickle: false,
  //   stream: stream,
  // });

  const handleMute = () => {
    //stream.getAudioTracks()[0].enabled = !mic;
    setMic(!mic);
  };

  const handleWebcam = () => {
    //stream.getVideoTracks()[0].enabled = !webcam;
    setWebcam(!webcam);
  };

  const startVideoStream = () => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((stream) => {
    //     setStream(stream);
    //     if (myVideo.current) {
    //       myVideo.current.srcObject = stream;
    //     }
    //   });
  };

  useEffect(() => {
    startVideoStream();
    // listenForVideo((err, data) => {
    //   if (err) {
    //     disconnectSocket();
    //     return;
    //   }
    //   if (data.token != auth.token) {
    //     peer.signal(data.signal);
    //   }
    // });

    // peer.on("signal", (data) => {
    //   streamVideo(auth.token, data);
    // });

    // peer.on("stream", (stream) => {
    //   matchedVideo.current.srcObject = stream;
    // });
  }, [webcam, mic]);

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
        {/* <img
          alt="Profile2"
          src={webcam ? Profile : profile.data.profileImageUrl}
          className={styles.videoSize}
        /> */}
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

// Use video tag when bringing in socket.io in the future
// <video playsInline muted ref={null} autoPlay className={styles.videoSize}/>

export default VideoPlayer;
