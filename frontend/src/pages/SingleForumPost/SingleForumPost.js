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
  Typography,
  TextField,
} from "@material-ui/core";

// Import Components
import Navbar from "../../components/Navbar/Navbar.js";
import VoteArrows from "../../components/VoteArrows/VoteArrows.js";

// Import CSS
import styles from "./SingleForumPost.module.css";

function SingleForumPost() {
  const [userComment, setUserComment] = useState("");

  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post.singlePost);
  const comments = useSelector((state) => state.comment.comments);
  const dispatch = useDispatch();

  const handleOnComment = () => {
    setUserComment("");
    dispatch(handleCreateComment(userComment, post._id));
  };

  useEffect(() => {
    dispatch(handleGetAllComments(post._id));
  }, [handleOnComment]);

  if (!auth.token) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <Grid container justifyContent="center">
        <Grid item className={styles.grid}>
          <Paper>
            <Grid container className={styles.gridContainer}>
              <Grid item xs={1} sm={1} md={1}>
                <VoteArrows votes={post.votes} postId={post._id} />
              </Grid>
              <Grid item xs={11} sm={11} md={11}>
                <Typography
                  gutterBottom
                  variant="h5"
                  className={styles.fontColor}
                >
                  {post.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  className={styles.fontColor}
                >
                  {post.content}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Typography variant="caption" className={styles.postDetails}>
                Posted by {post.userName} on {post.displayDate}
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Comment here"
                variant="outlined"
                multiline
                rows={12}
                fullWidth
                className={styles.commentBox}
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              />
              <Button
                className={styles.commentButton}
                onClick={() => handleOnComment()}
              >
                Comment
              </Button>
            </Grid>
            <Grid
              container
              direction="column"
              className={styles.commentContainer}
            >
              {comments ? (
                comments.map((comment) => (
                  <Card
                    key={comment._id}
                    variant="outlined"
                    className={styles.card}
                  >
                    <CardContent>
                      <Typography variant="h6" className={styles.commentName}>
                        {comment.userName}
                      </Typography>
                      <Typography variant="body1">{comment.content}</Typography>
                    </CardContent>
                  </Card>
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
