// Import Settings
import React, { useEffect } from "react";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { handleGetSinglePost } from "../../actions/post";

// Import Material-ui
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";

// Import styles
import styles from "./CommentDialog.module.css";

function CommentDialog(props) {
  const { isOpen, handleClose, postId } = props;
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.singlePost);
  const comments = useSelector((state) => state.comment.comments);

  useEffect(() => {
    if (postId) {
      dispatch(handleGetSinglePost(postId));
    }
  }, [postId]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle>
        <Typography variant="h6" className={styles.boldFont}>
          {post.title}
        </Typography>
        <Typography>{post.content}</Typography>
        <Grid container direction="row-reverse">
          <Typography variant="caption">
            Posted by {post.userName} on {post.displayDate}
          </Typography>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {comments ? (
            comments.map((comment) => (
              <Grid item xs={12} sm={12} md={12} key={comment._id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body1" className={styles.boldFont}>
                      {comment.userName}
                    </Typography>
                    <Typography variant="body2">{comment.content}</Typography>
                    <Grid container direction="row-reverse">
                      <Typography variant="caption">
                        Commented on {comment.displayDate}
                      </Typography>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <div></div>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className={styles.closeButton}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentDialog;
