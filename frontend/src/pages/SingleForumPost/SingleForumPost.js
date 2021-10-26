// Import Settings
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import {
  handleCreateComment,
  handleGetAllComments,
} from "../../actions/comment.js";

// Import Material-ui
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";

// Import Components
import Navbar from "../../components/Navbar/Navbar.js";
import VoteArrows from "../../components/VoteArrows/VoteArrows.js";
import CommentDetails from "../../components/CommentDetails/CommentDetails.js";
import PostDetails from "../../components/PostDetails/PostDetails.js";

// Import CSS
import styles from "./SingleForumPost.module.css";

function SingleForumPost() {
  const [userComment, setUserComment] = useState("");
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post.singlePost);
  const comments = useSelector((state) => state.comment.comments);
  const createdComment = useSelector(
    (state) => state.comment.createCommentSuccess
  );
  const dispatch = useDispatch();

  const handleOnComment = () => {
    setUserComment("");
    dispatch(handleCreateComment(userComment, post._id));
  };

  useEffect(() => {
    dispatch(handleGetAllComments(post._id));
  }, [createdComment]);

  if (!auth.token) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <Grid container justifyContent="center">
        <Grid item xs={10} sm={10} md={10} className={styles.grid}>
          <Paper>
            <Grid
              container
              className={styles.gridContainer}
              justifyContent="flex-start"
            >
              <VoteArrows votes={post.votes} postId={post._id} />
              <Grid item xs={11} sm={11} md={11}>
                <PostDetails post={post} />
              </Grid>
            </Grid>
            <Grid container alignItems="center" direction="column">
              <Grid item xs={11} sm={11} md={11} className={styles.fullWidth}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Comment here"
                  variant="outlined"
                  multiline
                  rows={12}
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
            <Grid
              container
              direction="column"
              alignItems="center"
              className={styles.commentContainer}
              spacing={4}
            >
              {comments ? (
                comments.map((comment) => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    key={comment._id}
                    className={styles.fullWidth}
                  >
                    <Card variant="outlined">
                      <CardContent className={styles.cardContent}>
                        <CommentDetails comment={comment} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <div></div>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default SingleForumPost;
