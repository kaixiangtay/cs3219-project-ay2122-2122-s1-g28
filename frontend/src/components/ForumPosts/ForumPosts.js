// Import Settings
import React from "react";

// Import Redux
import { useDispatch } from "react-redux";
import { handlePostSelection } from "../../actions/forum";

// Import Material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// Import Components
import VoteArrows from "../VoteArrows/VoteArrows";

// Import FontAwesome
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import CSS
import styles from "./ForumPosts.module.css";

function ForumPosts(props) {
  // const posts = useSelector((state) => state.forum.posts);
  // const [sortByValue, setSortByValue] = useState("");
  const { topic } = props;
  const dispatch = useDispatch();

  const onClickSelectedPost = (postId) => {
    const postData = {
      postId: postId,
      topic: topic,
    };
    dispatch(handlePostSelection(props, postData));
  };

  const posts = [
    {
      title: "How to do CS2101 Assignment 1?",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      dateCreated: "2021-01-01",
      votes: 1,
      comments: [{ header: "hi" }, { header: "bye" }],
      userName: "Bryan Chia",
      _id: 1,
    },
    {
      title: "CS3219 help needed",
      content: "test",
      dateCreated: "2021-02-02",
      votes: 2,
      comments: [{ header: "hi" }, { header: "bye" }],
      userName: "Tim Tan",
      _id: 2,
    },
    {
      title: "test3",
      content: "test",
      dateCreated: "2021-03-02",
      votes: 3,
      comments: [{ header: "hi" }, { header: "bye" }],
      userName: "Mary",
      _id: 3,
    },
    {
      title: "test4",
      content: "test",
      dateCreated: "2021-04-02",
      votes: 4,
      comments: [{ header: "hi" }, { header: "bye" }],
      userName: "Mary",
      _id: 4,
    },
    {
      title: "test5",
      content: "test",
      dateCreated: "2021-05-02",
      votes: 5,
      comments: [{ header: "hi" }, { header: "bye" }],
      userName: "Mary",
      _id: 5,
    },
    {
      title: "test6",
      content: "test",
      dateCreated: "2021-06-02",
      votes: 6,
      comments: [{ header: "hi" }, { header: "bye" }],
      userName: "Mary",
      _id: 6,
    },
  ];

  return (
    <Grid container direction="column">
      {posts.map((post) => (
        <Grid container key={post} className={styles.postContainer}>
          <VoteArrows votes={post.votes} postId={post._id} />
          <Button
            key={post}
            className={styles.postButton}
            onClick={onClickSelectedPost(post._id)}
          >
            <Grid container direction="column" className={styles.postDetails}>
              <Typography variant="h6" align="left" className={styles.title}>
                {post.title}
              </Typography>
              <Typography
                variant="body1"
                align="left"
                className={styles.content}
              >
                {post.content}
              </Typography>
            </Grid>
            <Typography className={styles.comments}>
              <FontAwesomeIcon
                icon={faComment}
                className={styles.commentIcon}
              />
              {post.comments.length} Comments
            </Typography>
            <Typography className={styles.userName}>
              Posted by {post.userName} on {post.dateCreated}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default ForumPosts;
