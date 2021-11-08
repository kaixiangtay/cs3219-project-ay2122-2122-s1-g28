// Import Settings
import React from "react";

// Import Material-ui
import { Grid, Typography } from "@material-ui/core";

// Import FontAwesome
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import CSS
import styles from "./PostDetails.module.css";

function PostDetails(props) {
  const { post } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" align="left" className={styles.title}>
          {post.title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" align="left" className="text-transform">
          {post.content}
        </Typography>
      </Grid>
      <Grid item xs={12} align="right">
        <Typography variant="caption" className="text-transform">
          <FontAwesomeIcon icon={faComment} className={styles.commentIcon} />{" "}
          {post.comments.length} Comments
        </Typography>
      </Grid>
      <Grid item xs={12} align="right">
        <Typography variant="caption" className="text-transform">
          Posted by {post.name} on {post.displayDate}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PostDetails;
