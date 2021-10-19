// Import Settings
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// import Redux
import { handleNavigation } from "../../actions/navigation";
import { useDispatch, useSelector } from "react-redux";

// Import Material-ui
import { Grid } from "@material-ui/core";

// Import FontAwesome
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";

// Import Components
import Navbar from "../../components/Navbar/Navbar.js";
import PageTitle from "../../components/PageTitle/PageTitle.js";
import ForumGroup from "../../components/ForumGroup/ForumGroup.js";

// Import Constants
import { FORUM } from "../../constants/ReduxConstants";

// Import CSS
import styles from "./Forum.module.css";

function Forum() {
  const forumGroups = [
    { topic: "Academic" },
    { topic: "Admin" },
    { topic: "CCA" },
    { topic: "Accomodation" },
    { topic: "Tips" },
    { topic: "Miscellaneous" },
  ];

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!auth.token) {
    return <Redirect to="/login" />;
  }

  // Update navigation state when user returns to this page from previous page
  useEffect(() => {
    dispatch(handleNavigation(FORUM));
  }, []);

  return (
    <div>
      <Navbar />
      <Grid item md={12} className="center-text">
        <PageTitle title={"Forum"} icon={faCommentAlt} />
      </Grid>
      <Grid container spacing={5} className={styles.container}>
        {forumGroups.map((forum) => (
          <Grid item xs={4} sm={4} md={4} key={forum.topic}>
            <ForumGroup topic={forum.topic} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Forum;
