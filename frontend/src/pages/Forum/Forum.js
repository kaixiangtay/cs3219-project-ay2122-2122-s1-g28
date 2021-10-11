// Import Settings
import React from "react";

// Import Material-ui
import { Grid } from "@material-ui/core";

// Import FontAwesome
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";

// Import Components
import Navbar from "../../components/Navbar/Navbar.js";
import PageTitle from "../../components/PageTitle/PageTitle.js";
import ForumGroup from "../../components/ForumGroup/ForumGroup.js";

// Import CSS
import styles from "./Forum.module.css";

function Forum() {
  const forumGroups = [
    { topic: "academic" },
    { topic: "admin" },
    { topic: "CCA" },
    { topic: "accomodation" },
    { topic: "tips" },
    { topic: "miscellaneous" },
  ];

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
