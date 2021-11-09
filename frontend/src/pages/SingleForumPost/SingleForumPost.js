// Import Settings
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

// Import Redux
import { handleSortComments } from "../../actions/comment.js";
import { handleGetSinglePost } from "../../actions/post.js";
import { useDispatch, useSelector } from "react-redux";

// Import Material-ui
import { Card, CardContent, Container, Grid, Paper } from "@material-ui/core";

// Import Components
import Navbar from "../../components/Navbar/Navbar.js";
import PageTitle from "../../components/PageTitle/PageTitle.js";
import VoteArrows from "../../components/VoteArrows/VoteArrows.js";
import CommentDetails from "../../components/CommentDetails/CommentDetails.js";
import PostDetails from "../../components/PostDetails/PostDetails.js";
import BackButton from "../../components/BackButton/BackButton.js";
import CommentBox from "../../components/CommentBox/CommentBox.js";
import SortButton from "../../components/SortButton/SortButton.js";

// Import Constants
import { FORUM_ICONS } from "../../constants/ForumConstants.js";

// Import Resources
import SideDesign from "../../resources/Side-Design.png";

// Import CSS
import styles from "./SingleForumPost.module.css";

function SingleForumPost() {
  const [sortValue, setSortValue] = useState("");

  const history = useHistory();

  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post.singlePost);
  const comments = useSelector((state) => state.comment.comments);
  const topic = useSelector((state) => state.post.topic);
  const forumTopic = useSelector((state) => state.post.forumTopic);
  const createdComment = useSelector(
    (state) => state.comment.createCommentSuccess
  );
  const upvoteCommentSuccess = useSelector(
    (state) => state.comment.upvoteCommentSuccess
  );
  const downvoteCommentSuccess = useSelector(
    (state) => state.comment.downvoteCommentSuccess
  );
  const upvotePostSuccess = useSelector(
    (state) => state.post.upvotePostSuccess
  );
  const downvotePostSuccess = useSelector(
    (state) => state.post.downvotePostSuccess
  );
  const dispatch = useDispatch();

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
    } else if (createdComment) {
      dispatch(handleSortComments("latest", post._id));
    } else if (upvotePostSuccess || downvotePostSuccess) {
      dispatch(handleGetSinglePost(post._id));
    } else {
      return;
    }
  }, [
    post,
    createdComment,
    upvoteCommentSuccess,
    downvoteCommentSuccess,
    upvotePostSuccess,
    downvotePostSuccess,
  ]);

  return (
    <div>
      <Navbar />
      <img alt="SideDesign" src={SideDesign} className={"sideDesignLeft"} />
      <img alt="SideDesign" src={SideDesign} className={"sideDesignRight"} />
      <Container>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} className="center-text">
            <PageTitle title={forumTopic} icon={FORUM_ICONS[forumTopic]} />
          </Grid>
          <Grid item xs={12}>
            <BackButton handleOnBack={handleOnBack} />
          </Grid>
          <Grid item xs={12}>
            <Paper className={styles.paperPadding}>
              <Grid container spacing={2} className="scrollable">
                <Grid item xs={1}>
                  <VoteArrows
                    votes={post.votes}
                    postId={post._id}
                    sortBy={sortValue}
                  />
                </Grid>
                <Grid item xs={11}>
                  <PostDetails post={post} />
                </Grid>
                <Grid item xs={12}>
                  <CommentBox post={post} />
                </Grid>

                {comments.length != 0 ? (
                  <Grid item xs={12} align="left">
                    <SortButton
                      type="Comment"
                      postId={post._id}
                      sortBy={handleSortValue}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12} />
                )}

                <Grid container alignItems="center" spacing={4}>
                  {comments ? (
                    comments.map((comment) => (
                      <Grid item xs={12} key={comment._id}>
                        <Card variant="outlined">
                          <CardContent className={styles.cardContent}>
                            <Grid container spacing={2}>
                              <Grid item xs={1}>
                                <VoteArrows
                                  votes={comment.votes}
                                  postId={comment.postId}
                                  commentId={comment._id}
                                />
                              </Grid>
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
      </Container>
    </div>
  );
}

export default SingleForumPost;
