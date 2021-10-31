// Import Settings
import React from "react";
import { useHistory } from "react-router-dom";

// Import Redux
import { useDispatch } from "react-redux";
import { handleTopicSelection } from "../../actions/post";

// Import Material-ui
import { Button } from "@material-ui/core";

// Import CSS
import styles from "./ForumGroup.module.css";

function ForumGroup(props) {
  const { topic } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  return (
    <div>
      <Button
        className={styles.button}
        onClick={() => dispatch(handleTopicSelection(topic, history))}
      >
        {topic}
      </Button>
    </div>
  );
}

export default ForumGroup;
