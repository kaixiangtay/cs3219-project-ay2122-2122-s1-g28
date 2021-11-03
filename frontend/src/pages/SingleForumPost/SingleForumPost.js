// Import Settings
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

// Import Redux
import { handleSortComments } from "../../actions/comment.js";
import { useDispatch, useSelector } from "react-redux";

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
  const history = useHistory();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post.singlePost);
  const comments = useSelector((state) => state.comment.comments);
  const topic = useSelector((state) => state.post.topic);
  const createdComment = useSelector(
    (state) => state.comment.createCommentSuccess
  );
  const upvoteCommentSuccess = useSelector(
    (state) => state.comment.upvoteCommentSuccess
  );
  const downvoteCommentSuccess = useSelector(
    (state) => state.comment.downvoteCommentSuccess
  );

  const [sortValue, setSortValue] = useState("");

  const handleOnBack = () => {
    const path = "/forum/" + topic;
    history.push(path);
  };

  const handleSortValue = (sortValue) => {
    setSortValue(sortValue);
  };

  if (!auth.token) {
    return <Redirect to="/login" />;
  }

  useEffect(() => {
    // Default sort by latest comment
    if (upvoteCommentSuccess || downvoteCommentSuccess) {
      dispatch(handleSortComments(sortValue, post._id));
    } else if (post.comments.length || createdComment) {
      dispatch(handleSortComments("latest", post._id));
    } else {
      return;
    }
  }, [post, createdComment, upvoteCommentSuccess, downvoteCommentSuccess]);

  return (
    <div>
      <Navbar />
      <Grid container justifyContent="center" className={styles.backButton}>
        <Grid item xs={10} sm={10} md={10}>
          <BackButton handleOnBack={handleOnBack} />
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
              <VoteArrows
                votes={post.votes}
                postId={post._id}
                sortBy={sortValue}
              />
              <Grid item xs={11} sm={11} md={11}>
                <PostDetails post={post} />
              </Grid>
            </Grid>
            <CommentBox post={post} />
            <Grid
              container
              direction="column"
              spacing={2}
              className={styles.commentContainer}
            >
              {comments.length != 0 ? (
                <Grid item>
                  <SortButton
                    type="Comment"
                    postId={post._id}
                    sortBy={handleSortValue}
                  />
                </Grid>
              ) : (
                <Grid item />
              )}
              <Grid container alignItems="center" spacing={4}>
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
                          <Grid container>
                            <VoteArrows
                              votes={comment.votes}
                              postId={comment.postId}
                              commentId={comment._id}
                            />
                            <Grid item xs={11} sm={11} md={11}>
                              <CommentDetails comment={comment} />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <div />
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default SingleForumPost;
