// Import Settings
import React, { useEffect, useState } from "react";

// Import Redux
import { useDispatch } from "react-redux";
import { handleEditComment } from "../../actions/comment";

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

function EditCommentDialog(props) {
  const [content, setContent] = useState("");
  const [commentId, setCommentId] = useState("");
  const [postId, setPostId] = useState("");

  const { isOpen, handleClose, comment, selectedPostId } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    setContent(comment.content);
    setCommentId(comment._id);
    setPostId(selectedPostId);
  }, [isOpen]);

  const onClickSaveChanges = () => {
    const editedCommentData = {
      content: content,
      commentId: commentId,
    };
    dispatch(handleEditComment(postId, editedCommentData));
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
          <DialogTitle>Edit Comment</DialogTitle>
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

export default EditCommentDialog;
