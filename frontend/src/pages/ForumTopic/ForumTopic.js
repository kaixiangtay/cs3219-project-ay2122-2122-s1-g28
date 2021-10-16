// Import Settings
import React, { useState } from "react";

// Import Redux
// import { useSelector } from "react-redux";

// Import Material-ui
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
  // const [sortByValue, setSortByValue] = useState("");
  // const topic = useSelector((state) => state.forum.forumTopic);
  const [dialogOpen, setDialogOpen] = useState(false);
  const topic = "Academic";
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

  return (
    <div>
      <Navbar />
      <Grid item md={12} className="center-text">
        <PageTitle title={topic} icon={icon} />
      </Grid>
      <Grid container className={styles.container}>
        <Grid item xs={6} sm={6} md={6}>
          <Button className={styles.createButton} onClick={handleDialogOpen}>
            Create Post
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={6} className={styles.sortButton}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              label="Sort By"
              // value={sortByValue}
              // onChange={(e) => setSortByValue(e.target.value)}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="ascVote">Ascending Votes</MenuItem>
              <MenuItem value="descVote">Descending Votes</MenuItem>
            </Select>
          </FormControl>
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
