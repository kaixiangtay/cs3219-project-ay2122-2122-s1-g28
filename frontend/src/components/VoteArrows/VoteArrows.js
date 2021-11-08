// Import Settings
import React from "react";

// Import Redux
import { useDispatch } from "react-redux";
import { handleUpvotePost, handleDownvotePost } from "../../actions/post";
import {
  handleUpvoteComment,
  handleDownvoteComment,
} from "../../actions/comment";

// Import Material-ui
import { Grid, IconButton, Typography } from "@material-ui/core";

// Import FontAwesome
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import CSS
import styles from "./VoteArrows.module.css";

function VoteArrows(props) {
  const { votes, postId, commentId } = props;

  const dispatch = useDispatch();

  const handleUpvote = () => {
    if (!commentId) {
      // Upvote post
      dispatch(handleUpvotePost(postId));
    } else {
      // Upvote comment
      dispatch(handleUpvoteComment(postId, commentId));
    }
  };

  const handleDownvote = () => {
    if (!commentId) {
      // Downvote post
      dispatch(handleDownvotePost(postId));
    } else {
      // Downvote comment
      dispatch(handleDownvoteComment(postId, commentId));
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={styles.background}
    >
      <Grid item>
        <IconButton
          className={styles.upvoteButton}
          onClick={() => handleUpvote()}
        >
          <FontAwesomeIcon icon={faArrowAltCircleUp} />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography className={styles.voteColor}>{votes}</Typography>
      </Grid>
      <Grid item>
        <IconButton
          className={styles.downvoteButton}
          onClick={() => handleDownvote(postId)}
        >
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default VoteArrows;
