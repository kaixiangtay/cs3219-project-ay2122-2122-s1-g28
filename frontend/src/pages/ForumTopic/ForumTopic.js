// Import Settings
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { handleGetUserPosts } from "../../actions/post";

// Import Material-ui
import { Grid, Button } from "@material-ui/core";

// Import Components
import PageTitle from "../../components/PageTitle/PageTitle.js";
import Navbar from "../../components/Navbar/Navbar.js";
import ForumPosts from "../../components/ForumPosts/ForumPosts.js";
import CreatePostDialog from "../../components/CreatePostDialog/CreatePostDialog.js";
import BackButton from "../../components/BackButton/BackButton.js";
import SortButton from "../../components/SortButton/SortButton.js";

// Import Constants
import { FORUM_ICONS } from "../../constants/ForumConstants.js";

function ForumTopic() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortValue, setSortValue] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const topic = useSelector((state) => state.post.forumTopic);

  if (!auth.token) {
    return <Redirect to="/login" />;
  }

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleManagePost = () => {
    dispatch(handleGetUserPosts(topic, history));
  };

  const handleOnBack = () => {
    const path = "/forum";
    history.push(path);
  };

  const handleSortValue = (sortValue) => {
    setSortValue(sortValue);
  };

  return (
    <div>
      <Navbar />
      <Grid item xs={12} sm={12} md={12} className="center-text">
        <PageTitle title={topic} icon={FORUM_ICONS[topic]} />
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={10} sm={10} md={10}>
          <BackButton handleOnBack={handleOnBack} />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={10} sm={10} md={10}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item container xs={6} sm={6} md={6} spacing={4}>
              <Grid item>
                <Button className="orange-button" onClick={handleDialogOpen}>
                  Create Post
                </Button>
              </Grid>
              <Grid item>
                <Button className="orange-button" onClick={handleManagePost}>
                  Manage Posts/Comments
                </Button>
              </Grid>
            </Grid>
            <Grid item container xs={6} sm={6} md={6} direction="row-reverse">
              <SortButton type="Post" topic={topic} sortBy={handleSortValue} />
            </Grid>
          </Grid>
          <ForumPosts topic={topic} sortBy={sortValue} />
          <CreatePostDialog
            isOpen={dialogOpen}
            handleClose={() => setDialogOpen(false)}
            topic={topic}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ForumTopic;
