// Import Settings
import React from "react";
import { Link } from "react-router-dom";

// Import Material-ui
import { Button } from "@material-ui/core";

// Import CSS
import styles from "./ForumGroup.module.css";

function ForumGroup(props) {
  const { topic } = props;
  const path = "/forum/" + topic;

  return (
    <div>
      <Button className={styles.button} component={Link} to={path}>
        {topic}
      </Button>
    </div>
  );
}

export default ForumGroup;
