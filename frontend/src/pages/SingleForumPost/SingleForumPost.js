// Import Settings
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { handleSortComments } from "../../actions/comment.js";

// Import Material-ui
import { Card, CardContent, Grid, Paper } from "@material-ui/core";

// Import Components
import Navbar from "../../components/Navbar/Navbar.js";
import VoteArrows from "../../components/VoteArrows/VoteArrows.js";
import CommentDetails from "../../components/CommentDetails/CommentDetails.js";
import PostDetails from "../../components/PostDetails/PostDetails.js";
import BackButton from "../../components/BackButton/BackButton.js";
import CommentBox from "../../components/CommentBox/CommentBox.js";
import SortButton from "../../components/SortButton/SortButton.js";

// Import CSS
import styles from "./SingleForumPost.module.css";

function SingleForumPost() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post.singlePost);
  const comments = useSelector((state) => state.comment.comments);
  const createdComment = useSelector(
    (state) => state.comment.createCommentSuccess
  );

  if (!auth.token) {
    return <Redirect to="/login" />;
  }
  console.log(comments);
  useEffect(() => {
    // Default sort by latest comment
    if (post || createdComment) {
      dispatch(handleSortComments("latest", post._id));
    }
  }, [post, createdComment]);

  return (
    <div>
      <Navbar />
      <Grid container justifyContent="center" className={styles.backButton}>
        <Grid item xs={10} sm={10} md={10}>
          <BackButton />
        </Grid>
      </Grid>
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
            <CommentBox post={post} />
            <Grid
              container
              direction="column"
              alignItems="center"
              className={styles.commentContainer}
              spacing={4}
            >
              {comments.length != 0 ? (
                <SortButton type="Comment" postId={post._id} />
              ) : (
                <div></div>
              )}
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
