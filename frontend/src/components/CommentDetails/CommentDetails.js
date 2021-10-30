// Import Settings
import React from "react";

// Import Material-ui
import { Grid, Typography } from "@material-ui/core";

function CommentDetails(props) {
  const { comment } = props;
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Grid container direction="column">
          <Typography variant="body1" align="left" className="text-transform">
            {comment.content}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container direction="row-reverse">
          <Typography variant="caption" className="text-transform">
            Commented by {comment.name} on {comment.displayDate}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CommentDetails;
