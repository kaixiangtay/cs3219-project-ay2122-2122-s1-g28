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
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
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
      alignItems="center"
      className={styles.voteContainer}
    >
      <Grid item>
        <IconButton
          className={styles.upvoteButton}
          onClick={() => handleUpvote()}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography>{votes}</Typography>
      </Grid>
      <Grid item>
        <IconButton
          className={styles.downvoteButton}
          onClick={() => handleDownvote(postId)}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default VoteArrows;
