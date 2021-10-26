// Import Settings
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { handlePostSelection, handlePostSorting } from "../../actions/post";

// Import Material-ui
import { Button, Grid } from "@material-ui/core";

// Import Components
import VoteArrows from "../VoteArrows/VoteArrows";
import PostDetails from "../PostDetails/PostDetails";

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
              className={styles.postButton}
              onClick={() => onClickSelectedPost(post._id)}
            >
              <PostDetails post={post} />
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
