// Import Settings
import React from "react";
import { useHistory } from "react-router-dom";

// Import Redux
import { useDispatch } from "react-redux";
import { handleTopicSelection } from "../../actions/post";

// Import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Material-ui
import { Button } from "@material-ui/core";

// Import CSS
import styles from "./ForumGroup.module.css";

function ForumGroup(props) {
  const { topic, icon } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  return (
    <div>
      <Button
        className={styles.button}
        onClick={() => dispatch(handleTopicSelection(topic, history))}
      >
        <h2>
          {topic} <FontAwesomeIcon icon={icon} size="lg" />
        </h2>
      </Button>
    </div>
  );
}

export default ForumGroup;
