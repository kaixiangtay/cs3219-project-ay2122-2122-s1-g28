// Import Settings
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { handleDeletePost, handleGetUserPosts } from "../../actions/post";

// Import Components
import EditPostDialog from "../../components/EditPostDialog/EditPostDialog.js";
import PostDialog from "../PostDialog/PostDialog";
import PostDetails from "../PostDetails/PostDetails";
import ForumEditDelete from "../ForumEditDelete/ForumEditDelete";

// Import Material-ui
import { Button, Grid } from "@material-ui/core";

// Import CSS
import styles from "./UserPosts.module.css";

function UserPosts(props) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  const { posts, topic } = props;

  const history = useHistory();

  const postDeleted = useSelector((state) => state.post.deletePostSuccess);
  const postEdited = useSelector((state) => state.post.editPostSuccess);
  const dispatch = useDispatch();

  const onClickDeletePost = (postId) => {
    dispatch(handleDeletePost(postId));
  };

  const handleEditDialogOpen = (post) => {
    setSelectedPost(post);
    setEditDialogOpen(true);
  };

  const handlePostDialogOpen = (post) => {
    setSelectedPost(post);
    setPostDialogOpen(true);
  };

  useEffect(() => {
    dispatch(handleGetUserPosts(topic, history));
  }, [postDeleted, postEdited]);

  return (
    <Grid container direction="column">
      {posts ? (
        posts.map((post) => (
          <Grid container key={post._id} justifyContent="center">
            <Button
              variant="outlined"
              className={styles.postButton}
              onClick={() => handlePostDialogOpen(post)}
            >
              <PostDetails post={post} />
            </Button>
            <ForumEditDelete
              type="Post"
              handleEdit={() => handleEditDialogOpen(post)}
              handleDelete={() => onClickDeletePost(post._id)}
            />
          </Grid>
        ))
      ) : (
        <div></div>
      )}
      <EditPostDialog
        isOpen={editDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        post={selectedPost}
      />
      <PostDialog
        isOpen={postDialogOpen}
        handleClose={() => setPostDialogOpen(false)}
        post={selectedPost}
      />
    </Grid>
  );
}

export default UserPosts;
