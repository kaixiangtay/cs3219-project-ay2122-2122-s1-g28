// Import Settings
import React from "react";

// Import Redux
import { useDispatch } from "react-redux";
import { handleForumSelection } from "../../actions/post";

// Import Material-ui
import { Button } from "@material-ui/core";

// Import CSS
import styles from "./ForumGroup.module.css";

function ForumGroup(props) {
  const { topic } = props;
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        className={styles.button}
        onClick={() => dispatch(handleForumSelection(props, topic))}
      >
        {topic}
      </Button>
    </div>
  );
}

export default ForumGroup;
