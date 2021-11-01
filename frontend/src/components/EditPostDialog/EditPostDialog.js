// Import Settings
import React, { useEffect, useState } from "react";

// Import Redux
import { useDispatch } from "react-redux";
import { handleEditPost } from "../../actions/post";

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

function EditPostDialog(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState("");

  const { isOpen, handleClose, post } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
    setPostId(post._id);
  }, [isOpen]);

  const onClickSaveChanges = () => {
    const editedPostData = {
      title: title,
      content: content,
    };
    dispatch(handleEditPost(postId, editedPostData));
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
        <Grid item xs={6} sm={6} md={6}>
          <DialogTitle>Edit Post</DialogTitle>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Grid container direction="row-reverse">
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Content"
          fullWidth
          variant="outlined"
          multiline
          rows={18}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className="small-orange-button"
          onClick={() => onClickSaveChanges()}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditPostDialog;
