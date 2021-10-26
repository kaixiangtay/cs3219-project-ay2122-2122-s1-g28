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
  Grid,
  TextField,
  IconButton,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// Import CSS
import styles from "./CreatePostDialog.module.css";

// Import FontAwesome
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
    handleClose();
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
      <Grid container>
        <Grid item xs={11} sm={11} md={11}>
          <Grid container alignItems="center">
            <DialogTitle id="form-dialog-title">Create A Post</DialogTitle>
            <FontAwesomeIcon icon={faPen} />
          </Grid>
        </Grid>
        <Grid item xs={1} sm={1} md={1}>
          <Grid container direction="row-reverse">
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <DialogContent dividers>
        <Grid container spacing={1} direction="column">
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
              autoFocus
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
