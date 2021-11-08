// Import settings
import React, { useState } from "react";

// Import Redux
import { useDispatch } from "react-redux";
import { handleCreateComment } from "../../actions/comment.js";

// Import Material-ui
import { Button, Grid, TextField } from "@material-ui/core";

// Import CSS
import styles from "./CommentBox.module.css";

function CommentBox(props) {
  const [userComment, setUserComment] = useState("");

  const { post } = props;

  const dispatch = useDispatch();

  const handleOnComment = () => {
    setUserComment("");
    dispatch(handleCreateComment(userComment, post._id));
  };

  return (
    <Grid container alignItems="center" direction="column">
      <Grid item xs={11} sm={11} md={11} className={styles.fullWidth}>
        <TextField
          autoFocus
          margin="dense"
          label="Comment here"
          variant="outlined"
          multiline
          rows={5}
          fullWidth
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
        />
        <Grid container direction="row-reverse">
          <Button
            className="small-orange-button"
            onClick={() => handleOnComment()}
          >
            Comment
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CommentBox;
