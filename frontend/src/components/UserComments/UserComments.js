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
import CommentDetails from "../CommentDetails/CommentDetails";
import ForumEditDelete from "../ForumEditDelete/ForumEditDelete";

// Import Material-ui
import { Button, Grid } from "@material-ui/core";

// Import CSS
import styles from "./UserComments.module.css";

function UserComments(props) {
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [selectedComment, setSelectedComment] = useState("");

  const { comments, topic } = props;

  const commentDeleted = useSelector(
    (state) => state.comment.deleteCommentSuccess
  );
  const commentEdited = useSelector(
    (state) => state.comment.editCommentSuccess
  );
  const dispatch = useDispatch();

  const onClickDeleteComment = (commentId, postId) => {
    dispatch(handleDeleteComment(commentId, postId));
  };

  const handleEditDialogOpen = (comment, postId) => {
    setSelectedComment(comment);
    setSelectedPostId(postId);
    setEditDialogOpen(true);
  };

  const handleCommentDialogOpen = (postId) => {
    setSelectedPostId(postId);
    setCommentDialogOpen(true);
  };

  useEffect(() => {
    dispatch(handleGetUserComments(topic));
  }, [commentDeleted, commentEdited]);

  return (
    <Grid container direction="column">
      {comments ? (
        comments.map((comment) => (
          <Grid container key={comment._id} justifyContent="center">
            <Button
              className={styles.commentButton}
              variant="outlined"
              onClick={() => handleCommentDialogOpen(comment.postId)}
            >
              <CommentDetails comment={comment} />
            </Button>
            <ForumEditDelete
              type="Comment"
              handleEdit={() => handleEditDialogOpen(comment, comment.postId)}
              handleDelete={() =>
                onClickDeleteComment(comment._id, comment.postId)
              }
            />
          </Grid>
        ))
      ) : (
        <div />
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
