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
  DialogTitle,
  TextField,
  IconButton,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// Import CSS
import styles from "./CreatePostDialog.module.css";

// IMport FontAwesome
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreatePostDialog(props) {
  const { isOpen, handleClose, topic } = props;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = () => {
    let postData = {
      topic: topic,
      title: title,
      content: content,
    };
    dispatch(handleCreatePost(postData));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose(event, reason);
        }
      }}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle id="form-dialog-title">
        Create A Post
        <FontAwesomeIcon icon={faPen} className={styles.icon} />
        <IconButton
          aria-label="close"
          className={styles.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          className={styles.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Text"
          fullWidth
          variant="outlined"
          multiline
          rows={18}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button className={styles.postButton} onClick={handleCreate}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreatePostDialog;
