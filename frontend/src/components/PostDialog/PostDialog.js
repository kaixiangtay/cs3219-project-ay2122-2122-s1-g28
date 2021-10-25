// Import Settings
import React, { useEffect, useState } from "react";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllComments } from "../../actions/comment";

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
// import CloseIcon from "@material-ui/icons/Close";

// Import styles
import styles from "./PostDialog.module.css";

function PostDialog(props) {
  const { isOpen, handleClose, post } = props;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState("");
  const comments = useSelector((state) => state.comment.comments);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
    setPostId(post._id);
  }, [isOpen]);

  useEffect(() => {
    if (postId) {
      dispatch(handleGetAllComments(postId));
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
          {title}
        </Typography>
        <Typography>{content}</Typography>
        <Grid container direction="row-reverse">
          <Typography variant="caption">
            Posted by {post.userName} on {post.displayDate}
          </Typography>
        </Grid>
      </DialogTitle>
      <DialogContent>
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

export default PostDialog;
