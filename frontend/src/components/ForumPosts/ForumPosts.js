// Import Settings
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { handlePostSelection, handlePostSorting } from "../../actions/post";

// Import Material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// Import Components
import VoteArrows from "../VoteArrows/VoteArrows";

// Import FontAwesome
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import CSS
import styles from "./ForumPosts.module.css";

function ForumPosts(props) {
  const { topic } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector((state) => state.post.posts);
  const newPostCreated = useSelector((state) => state.post.createPostSuccess);

  const onClickSelectedPost = (postId) => {
    const postData = {
      postId: postId,
      topic: topic,
    };
    dispatch(handlePostSelection(history, postData));
  };

  useEffect(() => {
    // Default sort by latest post
    if (newPostCreated) {
      dispatch(handlePostSorting("latest", topic));
    }
  }, [newPostCreated]);

  return (
    <Grid container direction="column">
      {posts ? (
        posts.map((post) => (
          <Grid container key={post._id} className={styles.postContainer}>
            <VoteArrows votes={post.votes} postId={post._id} />
            <Button
              key={post}
              className={styles.postButton}
              onClick={() => onClickSelectedPost(post._id)}
            >
              <Grid container direction="column" className={styles.postDetails}>
                <Typography variant="h6" align="left" className={styles.title}>
                  {post.title}
                </Typography>
                <Typography
                  variant="body1"
                  align="left"
                  className={styles.content}
                >
                  {post.content}
                </Typography>
              </Grid>
              <Typography variant="caption" className={styles.comments}>
                <FontAwesomeIcon
                  icon={faComment}
                  className={styles.commentIcon}
                />
                {post.comments.length} Comments
              </Typography>
              <Typography variant="caption" className={styles.userName}>
                Posted by {post.userName} on {post.displayDate}
              </Typography>
            </Button>
          </Grid>
        ))
      ) : (
        <div></div>
      )}
    </Grid>
  );
}

export default ForumPosts;
