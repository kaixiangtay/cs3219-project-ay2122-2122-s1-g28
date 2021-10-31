// Import Settings
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { handleGetSinglePost, handleSortPost } from "../../actions/post";

// Import Material-ui
import { Button, Grid } from "@material-ui/core";

// Import Components
import VoteArrows from "../VoteArrows/VoteArrows";
import PostDetails from "../PostDetails/PostDetails";

// Import CSS
import styles from "./ForumPosts.module.css";

function ForumPosts(props) {
  const [postId, setPostId] = useState("");

  const { topic } = props;

  const history = useHistory();

  const posts = useSelector((state) => state.post.posts);
  const newPostCreated = useSelector((state) => state.post.createPostSuccess);
  const getPostSuccess = useSelector(
    (state) => state.post.getSinglePostSuccess
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (postId) {
      dispatch(handleGetSinglePost(postId));
    }
  }, [postId]);

  useEffect(() => {
    if (getPostSuccess) {
      let path = "/forum/" + topic.toLowerCase() + "/" + postId;
      history.push(path);
    }
  }, [getPostSuccess]);

  useEffect(() => {
    // Default sort by latest post
    if (newPostCreated) {
      dispatch(handleSortPost("latest", topic));
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
              onClick={() => setPostId(post._id)}
            >
              <PostDetails post={post} />
            </Button>
          </Grid>
        ))
      ) : (
        <div />
      )}
    </Grid>
  );
}

export default ForumPosts;
