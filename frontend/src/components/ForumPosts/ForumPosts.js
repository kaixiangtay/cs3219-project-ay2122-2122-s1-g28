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

  const { topic, sortBy } = props;

  const history = useHistory();

  const posts = useSelector((state) => state.post.posts);
  const newPostCreated = useSelector((state) => state.post.createPostSuccess);
  const getPostSuccess = useSelector(
    (state) => state.post.getSinglePostSuccess
  );
  const upvotePostSuccess = useSelector(
    (state) => state.post.upvotePostSuccess
  );
  const downvotePostSuccess = useSelector(
    (state) => state.post.downvotePostSuccess
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
    if (newPostCreated || upvotePostSuccess || downvotePostSuccess) {
      const sortValue = sortBy;
      dispatch(handleSortPost(sortValue, topic));
    }
  }, [newPostCreated, upvotePostSuccess, downvotePostSuccess]);

  return (
    <div>
      {posts ? (
        posts.map((post) => (
          <Grid container key={post._id} className={styles.postGap}>
            <Grid item xs={1}>
              <VoteArrows votes={post.votes} postId={post._id} />
            </Grid>
            <Grid item xs={11}>
              <Button
                className={styles.postButton}
                onClick={() => setPostId(post._id)}
              >
                <PostDetails post={post} />
              </Button>
            </Grid>
          </Grid>
        ))
      ) : (
        <div />
      )}
    </div>
  );
}

export default ForumPosts;
