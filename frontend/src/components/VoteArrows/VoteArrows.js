// Import Settings
import React from "react";

// Import Redux
import { handleUpvotePost, handleDownvotePost } from "../../actions/post";
import { useDispatch } from "react-redux";

// Import Material-ui
import { Grid, IconButton } from "@material-ui/core";

// Import FontAwesome
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import CSS
import styles from "./VoteArrows.module.css";

function VoteArrows(props) {
  const { votes, postId } = props;
  const dispatch = useDispatch();

  return (
    <Grid container direction="column" className={styles.voteContainer}>
      <IconButton
        className={styles.upvoteButton}
        onClick={() => dispatch(handleUpvotePost(postId))}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </IconButton>
      <div className={styles.numVotes}>{votes}</div>
      <IconButton
        className={styles.downvoteButton}
        onClick={() => dispatch(handleDownvotePost(postId))}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </IconButton>
    </Grid>
  );
}

export default VoteArrows;
