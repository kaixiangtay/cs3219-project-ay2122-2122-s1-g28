// Import Settings
import React from "react";

// Import Redux
// import { useSelector } from "react-redux";

// Import Material-ui
import { Button, Grid } from "@material-ui/core";

// Import CSS
import styles from "./ForumPost.module.css";

function ForumPost() {
  // const posts = useSelector((state) => state.forum.posts);
  const posts = [{ title: "test1" }, { title: "test2" }];

  return (
    <div>
      <Grid container direction="column">
        {posts.map((post) => (
          <Button key={post} className={styles.postButton}>
            post.title
          </Button>
        ))}
      </Grid>
    </div>
  );
}

export default ForumPost;
