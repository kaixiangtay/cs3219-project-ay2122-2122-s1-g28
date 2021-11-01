// Import Settings
import React from "react";

// Import Material-ui
import { Button, Grid } from "@material-ui/core";

// Import FontAwesome
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import CSS
import styles from "./ForumEditDelete.module.css";

// Handle forum edit and delete buttons UI
function ForumEditDelete(props) {
  // Type can be post or comment
  const { type, handleEdit, handleDelete } = props;

  return (
    <Grid
      container
      direction="row-reverse"
      spacing={2}
      className={styles.buttonContainer}
    >
      <Grid item>
        <Button size="small" className={styles.editButton} onClick={handleEdit}>
          Edit {type}
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="small"
          className={styles.deleteButton}
          onClick={handleDelete}
        >
          Delete {type} <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Grid>
    </Grid>
  );
}

export default ForumEditDelete;
