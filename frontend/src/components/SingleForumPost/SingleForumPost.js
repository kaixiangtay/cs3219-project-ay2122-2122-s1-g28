// Import Settings
import React, { useState } from "react";

// Import Redux
import { useDispatch } from "react-redux";
import { handleCreateComment } from "../../actions/forum.js";

// Import Material-ui
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";

// Import Components
import Navbar from "../../components/Navbar/Navbar.js";

// Import CSS
import styles from "./SingleForumPost.module.css";
import VoteArrows from "../VoteArrows/VoteArrows.js";

function SingleForumPost() {
  // const post = useSelector((state) => state.forum.singlePost);
  const dispatch = useDispatch();
  const [userComment, setUserComment] = useState("");
  const post = {
    title: "How to do CS2101 Assignment 1?",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    dateCreated: "2021-01-01",
    votes: 1,
    comments: [
      {
        userName: "Dylan",
        content:
          " On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. ",
      },
      { userName: "Tiffany", content: "comment 2" },
    ],
    userName: "Bryan Chia",
    _id: 1,
  };
  const comments = post.comments;

  return (
    <div>
      <Navbar />

      <Grid container justifyContent="center">
        <Grid item className={styles.grid}>
          <Paper>
            <Grid container className={styles.gridContainer}>
              <Grid item xs={1} sm={1} md={1}>
                <VoteArrows votes={post.votes} postId={post._id} />
              </Grid>
              <Grid item xs={11} sm={11} md={11}>
                <Typography
                  gutterBottom
                  variant="h5"
                  className={styles.fontColor}
                >
                  {post.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  className={styles.fontColor}
                >
                  {post.content}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Typography variant="caption" className={styles.postDetails}>
                Posted by {post.userName} on {post.dateCreated}
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Comment here"
                variant="outlined"
                multiline
                rows={12}
                fullWidth
                className={styles.commentBox}
                onChange={(e) => setUserComment(e.target.value)}
              />
              <Button
                className={styles.commentButton}
                onClick={() => dispatch(handleCreateComment(userComment))}
              >
                Comment
              </Button>
            </Grid>
            <Grid
              container
              direction="column"
              className={styles.commentContainer}
            >
              {comments.map((comment) => (
                <Card
                  key={comment}
                  variant="outlined"
                  className={styles.card}
                  overFlow="auto"
                >
                  <CardContent>
                    <Typography variant="h6" className={styles.commentName}>
                      {comment.userName}
                    </Typography>
                    <Typography variant="body1">{comment.content}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default SingleForumPost;
