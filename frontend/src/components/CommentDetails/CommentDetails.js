// Import Settings
import React from "react";

// Import Material-ui
import { Grid, Typography } from "@material-ui/core";

function CommentDetails(props) {
  const { comment } = props;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="left">
        <Typography variant="body1" className="text-transform">
          {comment.content}
        </Typography>
      </Grid>
      <Grid item xs={12} align="right">
        <Typography variant="caption" className="text-transform">
          Commented by {comment.name} on {comment.displayDate}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default CommentDetails;
