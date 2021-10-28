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
import BackButton from "../../components/BackButton/BackButton";

// Import FontAwesome
import {
  faFileAlt,
  faPen,
  faSwimmer,
  faHome,
  faComments,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import SortButton from "../../components/SortButton/SortButton";

function ForumTopic() {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const topic = useSelector((state) => state.post.forumTopic);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!auth.token) {
    return <Redirect to="/login" />;
  }

  const icon =
    topic == "Academic"
      ? faFileAlt
      : topic == "Admin"
      ? faPen
      : topic == "CCA"
      ? faSwimmer
      : topic == "Accomodation"
      ? faHome
      : topic == "Tips"
      ? faComments
      : topic == "Miscellaneous"
      ? faSlidersH
      : null;

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleManagePost = () => {
    dispatch(handleGetUserPosts(topic, history));
  };

  return (
    <div>
      <Navbar />
      <Grid item xs={12} sm={12} md={12} className="center-text">
        <PageTitle title={topic} icon={icon} />
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={10} sm={10} md={10}>
          <BackButton />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={10} sm={10} md={10}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={6} sm={6} md={6}>
              <Grid container spacing={4}>
                <Grid item>
                  <Button className="orange-button" onClick={handleDialogOpen}>
                    Create Post
                  </Button>
                </Grid>
                <Grid item>
                  <Grid container>
                    <Button
                      className="orange-button"
                      onClick={handleManagePost}
                    >
                      Manage Posts/Comments
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <SortButton type="Post" topic={topic} />
            </Grid>
          </Grid>
          <ForumPosts topic={topic} />
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
