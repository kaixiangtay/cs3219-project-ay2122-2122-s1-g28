// Import Settings
import React, { useEffect, useState } from "react";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { handleSortComments } from "../../actions/comment";

// Import Components
import CommentDetails from "../CommentDetails/CommentDetails";
import PostDetails from "../PostDetails/PostDetails";

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
} from "@material-ui/core";

function PostDialog(props) {
  const [postDetails, setPostDetails] = useState("");
  const [postId, setPostId] = useState("");

  const { isOpen, handleClose, post } = props;

  const comments = useSelector((state) => state.comment.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    const postData = {
      title: post.title,
      content: post.content,
      comments: post.comments,
      name: post.name,
      displayDate: post.displayDate,
    };
    setPostDetails(postData);
    setPostId(post._id);
  }, [isOpen]);

  useEffect(() => {
    if (postId) {
      dispatch(handleSortComments("latest", postId));
    }
  }, [postId]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle disableTypography>
        <PostDetails post={postDetails} />
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {comments ? (
            comments.map((comment) => (
              <Grid item xs={12} sm={12} md={12} key={comment._id}>
                <Card variant="outlined">
                  <CardContent>
                    <CommentDetails comment={comment} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <div />
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className="small-orange-button">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PostDialog;
