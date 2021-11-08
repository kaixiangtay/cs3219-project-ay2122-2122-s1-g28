// Import Settings
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { handleGetUserPosts } from "../../actions/post";

// Import Material-ui
import { Container, Grid, Button } from "@material-ui/core";

// Import Components
import PageTitle from "../../components/PageTitle/PageTitle.js";
import Navbar from "../../components/Navbar/Navbar.js";
import ForumPosts from "../../components/ForumPosts/ForumPosts.js";
import CreatePostDialog from "../../components/CreatePostDialog/CreatePostDialog.js";
import BackButton from "../../components/BackButton/BackButton.js";
import SortButton from "../../components/SortButton/SortButton.js";

// Import Constants
import { FORUM_ICONS } from "../../constants/ForumConstants.js";

// Import Resources
import SideDesign from "../../resources/Side-Design.png";

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
      <img alt="SideDesign" src={SideDesign} className={"sideDesignLeft"} />
      <img alt="SideDesign" src={SideDesign} className={"sideDesignRight"} />
      <Container>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} className="center-text">
            <PageTitle title={topic} icon={FORUM_ICONS[topic]} />
          </Grid>
          <Grid item xs={12}>
            <BackButton handleOnBack={handleOnBack} />
          </Grid>
          <Grid item xs={12} md={4} className="center-text">
            <Button className="orange-button" onClick={handleDialogOpen}>
              Create Post
            </Button>
          </Grid>
          <Grid item xs={12} md={4} className="center-text">
            <Button className="orange-button" onClick={handleManagePost}>
              Manage Posts/Comments
            </Button>
          </Grid>
          <Grid item xs={12} md={4} className="center-text">
            <SortButton type="Post" topic={topic} sortBy={handleSortValue} />
          </Grid>
          <Grid item xs={12} className="scrollable">
            <ForumPosts topic={topic} sortBy={sortValue} />
          </Grid>
        </Grid>
        <CreatePostDialog
          isOpen={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          topic={topic}
        />
      </Container>
    </div>
  );
}

export default ForumTopic;
