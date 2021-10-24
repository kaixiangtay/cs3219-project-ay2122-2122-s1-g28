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
        <Grid item xs={10} sm={10} md={10} className={styles.grid}>
          <Paper>
            <Grid
              container
              className={styles.gridContainer}
              justifyContent="center"
            >
              <Grid item>
                <VoteArrows votes={post.votes} postId={post._id} />
              </Grid>
              <Grid item xs={11} sm={11} md={11}>
                <Typography gutterBottom variant="h6" className={styles.title}>
                  {post.title}
                </Typography>
                <Typography gutterBottom variant="body1">
                  {post.content}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item xs={11} sm={11} md={11}>
                <Grid container direction="row-reverse">
                  <Typography variant="caption">
                    Posted by {post.userName} on {post.displayDate}
                  </Typography>
                </Grid>
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
                    className={styles.commentButton}
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
              justifyContent="center"
              className={styles.commentContainer}
            >
              {comments ? (
                comments.map((comment) => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    key={comment._id}
                    className={styles.comment}
                  >
                    <Card variant="outlined">
                      <CardContent className={styles.cardContent}>
                        <Typography variant="h6" className={styles.commentName}>
                          {comment.userName}
                        </Typography>
                        <Typography variant="body1">
                          {comment.content}
                        </Typography>
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
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default SingleForumPost;
