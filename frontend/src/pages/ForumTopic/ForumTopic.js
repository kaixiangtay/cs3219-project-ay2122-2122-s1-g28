// Import Settings
import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { handleSortPost, handleGetUserPosts } from "../../actions/post";

// Import Material-ui
import {
  Grid,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

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

// Import CSS
import styles from "./ForumTopic.module.css";

function ForumTopic() {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const topic = useSelector((state) => state.post.forumTopic);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortByValue, setSortByValue] = useState("latest");

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

  useEffect(() => {
    dispatch(handleSortPost(sortByValue, topic));
  }, [sortByValue]);

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
              <Grid container direction="row-reverse">
                <Grid
                  item
                  xs={1}
                  sm={1}
                  md={1}
                  className={styles.sortButtonContainer}
                >
                  <Typography
                    variant="button"
                    align="left"
                    className="primary-font"
                  >
                    Sort By:
                  </Typography>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                    className={styles.sortButton}
                  >
                    <Select
                      label="Sort By"
                      value={sortByValue}
                      onChange={(e) => setSortByValue(e.target.value)}
                    >
                      <MenuItem value="latest">Latest</MenuItem>
                      <MenuItem value="oldest">Oldest</MenuItem>
                      <MenuItem value="ascVote">Lowest Votes</MenuItem>
                      <MenuItem value="descVote">Highest Votes</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
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
