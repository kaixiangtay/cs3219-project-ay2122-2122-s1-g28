// Import Settings
import React, { useEffect, useState } from "react";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteComment,
  handleGetUserComments,
} from "../../actions/comment";

// Import Components
import CommentDialog from "../CommentDialog/CommentDialog";
import EditCommentDialog from "../EditCommentDialog/EditCommentDialog";

// Import Material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// Import FontAwesome
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import CSS
import styles from "./UserComments.module.css";

function UserComments(props) {
  const { comments, topic } = props;
  const dispatch = useDispatch();
  const commentDeleted = useSelector(
    (state) => state.comment.deleteCommentSuccess
  );
  const commentEdited = useSelector(
    (state) => state.comment.editCommentSuccess
  );
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [selectedComment, setSelectedComment] = useState("");

  const onClickDeleteComment = (commentId, postId) => {
    dispatch(handleDeleteComment(commentId, postId));
  };

  const handleCommentDialogOpen = (postId) => {
    setSelectedPostId(postId);
    setCommentDialogOpen(true);
  };

  const handleEditDialogOpen = (comment, postId) => {
    setSelectedComment(comment);
    setSelectedPostId(postId);
    setEditDialogOpen(true);
  };

  useEffect(() => {
    dispatch(handleGetUserComments(topic));
  }, [commentDeleted, commentEdited]);

  return (
    <Grid container direction="column">
      {comments ? (
        comments.map((comment) => (
          <Grid
            container
            key={comment._id}
            className={styles.commentsContainer}
            justifyContent="center"
          >
            <Button
              className={styles.postButton}
              variant="outlined"
              onClick={() => handleCommentDialogOpen(comment.postId)}
            >
              <Grid container direction="column" className={styles.postDetails}>
                <Typography
                  variant="body1"
                  align="left"
                  className={styles.content}
                >
                  {comment.content}
                </Typography>
              </Grid>
              <Typography variant="caption" className={styles.userName}>
                Commented by {comment.userName} on {comment.displayDate}
              </Typography>
            </Button>
            <Grid
              container
              direction="row-reverse"
              spacing={2}
              className={styles.buttonContainer}
            >
              <Grid item>
                <Button
                  size="small"
                  className={styles.editButton}
                  onClick={() => handleEditDialogOpen(comment, comment.postId)}
                >
                  Edit Comment
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  className={styles.deleteButton}
                  onClick={() =>
                    onClickDeleteComment(comment._id, comment.postId)
                  }
                >
                  Delete Comment <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))
      ) : (
        <div></div>
      )}
      <CommentDialog
        isOpen={commentDialogOpen}
        handleClose={() => setCommentDialogOpen(false)}
        postId={selectedPostId}
      />
      <EditCommentDialog
        isOpen={editDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        comment={selectedComment}
        selectedPostId={selectedPostId}
      />
    </Grid>
  );
}

export default UserComments;
