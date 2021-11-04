// Import Settings
import React, { useState } from "react";

// Import Redux
import { useDispatch } from "react-redux";
import { handleCreatePost } from "../../actions/post";

// Import Material-ui
import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Button,
  DialogTitle,
} from "@material-ui/core";

// Import CSS
import styles from "./CreatePostDialog.module.css";

// Import FontAwesome
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreatePostDialog(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { isOpen, handleClose, topic } = props;

  const dispatch = useDispatch();

  const handleCreate = () => {
    let postData = {
      topic: topic,
      title: title,
      content: content,
    };
    dispatch(handleCreatePost(postData));
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle className="center-text">
        Create A Post <FontAwesomeIcon icon={faPen} />
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              className={styles.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              margin="dense"
              label="Content"
              fullWidth
              variant="outlined"
              multiline
              rows={18}
              onChange={(e) => setContent(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className="small-orange-button" onClick={() => handleCreate()}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreatePostDialog;
