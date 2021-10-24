// Import Settings
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { handlePostSorting } from "../../actions/post";

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

// Import CSS
import styles from "./ForumTopic.module.css";

// Import FontAwesome
import {
  faFileAlt,
  faPen,
  faSwimmer,
  faHome,
  faComments,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";

function ForumTopic() {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(handlePostSorting(sortByValue, topic));
  }, [sortByValue]);

  return (
    <div>
      <Navbar />
      <Grid item md={12} className="center-text">
        <PageTitle title={topic} icon={icon} />
      </Grid>
      <Grid container className={styles.container}>
        <Grid container direction="row-reverse">
          <Grid item className={styles.sortButtonContainer}>
            <Typography
              variant="button"
              align="left"
              className={styles.sortText}
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
        <Grid container>
          <Grid item xs={6} sm={6} md={6}>
            <Button
              className={styles.createManageButton}
              onClick={handleDialogOpen}
            >
              Create Post
            </Button>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <Grid container direction="row-reverse">
              <Button className={styles.createManageButton}>
                Manage Posts/Comments
              </Button>
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
    </div>
  );
}

export default ForumTopic;
