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
    <Grid container>
      <Grid container direction="column" className={styles.postDetails}>
        <Typography variant="h6" align="left" className={styles.title}>
          {post.title}
        </Typography>
        <Typography variant="body1" align="left" className="text-transform">
          {post.content}
        </Typography>
      </Grid>
      <Grid container>
        <Grid item xs={6} sm={6} md={6}>
          <Grid container justifyContent="flex-start" spacing={1}>
            <Grid item>
              <FontAwesomeIcon
                icon={faComment}
                className={styles.commentIcon}
              />
            </Grid>
            <Grid item>
              <Typography variant="caption" className="text-transform">
                {post.comments.length} Comments
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Grid container direction="row-reverse">
            <Typography variant="caption" className="text-transform">
              Posted by {post.userName} on {post.displayDate}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PostDetails;
