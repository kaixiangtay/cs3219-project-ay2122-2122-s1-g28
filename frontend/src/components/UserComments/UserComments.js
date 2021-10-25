// Import Settings
import React, { useEffect } from "react";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteComment,
  handleGetUserComments,
} from "../../actions/comment";

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

  const onClickDeleteComment = (commentId, postId) => {
    dispatch(handleDeleteComment(commentId, postId));
  };

  // const onClickEditPost = () => {
  // dispatch(handleEditPost(postId));
  // };

  useEffect(() => {
    dispatch(handleGetUserComments(topic));
  }, [commentDeleted]);

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
              // onClick={() => onClickSelectedPost(post._id)}
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
                  // onClick={() => onClickEditPost(post._id)}
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
    </Grid>
  );
}

export default UserComments;
