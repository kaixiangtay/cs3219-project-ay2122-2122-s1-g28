import { validationResult } from "express-validator";
import postValidator from "../middlewares/postValidator.js";
import userAuth from "../middlewares/userAuth.js";
import postService from "../services/postService.js";

const createPost = [
  userAuth.decodeAuthToken,
  postValidator.addPostValidator(),
  (req, res) => {
    try {
      const userId = req.userId;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        let newErrArray = [];
        const errArray = errors.errors;

        for (let i = 0; i < errArray.length; i++) {
          if (errArray[i]["param"] == "content") {
            newErrArray.push(errArray[i]);
          }
          if (errArray[i]["param"] == "title") {
            newErrArray.push(errArray[i]);
          }
        }
        return res.status(404).json(newErrArray);
      }
      const post = postService.createPost(userId, req.body);
      return res.status(200).json({
        status: "success",
        msg: "New post created!",
        data: post,
      });
    } catch (err) {
      return res.status(404).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

const viewPost = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const post = await postService.getPostByID(req.params.post_id);
      if (post == null) {
        return res.status(404).json({
          status: "error",
          msg: "Post not found!",
        });
      }
      return res.status(200).json({
        status: "success",
        msg: "Post retrieved successfully!",
        data: post,
        numberOfComments: post.comments.length,
      });
    } catch (err) {
      return res.status(404).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

const viewUserPosts = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      const posts = await postService.getPostsByUserID(
        userId,
        req.params.topic
      );
      const emptyPostDatabase = posts.length == 0;

      if (emptyPostDatabase) {
        return res.status(200).json({
          status: "success",
          msg: `This user does not have any posts under this topic: ${req.params.topic}`,
          data: posts,
        });
      }
      return res.status(200).json({
        status: "success",
        msg: "Posts retrieved successfully!",
        data: posts,
      });
    } catch (err) {
      return res.status(404).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

const updatePost = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      let post = await postService.getPostByID(req.params.post_id);
      if (post == null) {
        return res.status(404).json({
          status: "error",
          msg: "Post not found!",
        });
      }

      if (postService.isUserPost(post.userId, userId)) {
        // userId == postId
        post = await postService.updatePost(post, req.body);
        return res.status(200).json({
          status: "success",
          msg: "Post has been updated!",
          data: post,
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "User is not authorised to edit this post",
        });
      }
    } catch (err) {
      return res.status(404).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

const upvotePost = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      let post = await postService.getPostByID(req.params.post_id);
      if (post == null) {
        return res.status(404).json({
          status: "error",
          msg: "Post not found!",
        });
      }
      if (postService.isUserPost(post.userId, userId)) {
        return res.status(404).json({
          status: "error",
          msg: "Users are not allowed to upvote their own posts!",
        });
      } else {
        post = postService.upvotePost(userId, post);
        if (post == null) {
          return res.status(404).json({
            status: "error",
            msg: "Users can only upvote a post ONCE!",
          });
        } else {
          return res.status(200).json({
            status: "success",
            msg: "Post has been upvoted!",
            data: post,
          });
        }
      }
    } catch (err) {
      return res.status(404).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

const downvotePost = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      let post = await postService.getPostByID(req.params.post_id);
      if (post == null) {
        return res.status(404).json({
          status: "error",
          msg: "Post not found!",
        });
      }
      if (postService.isUserPost(post.userId, userId)) {
        return res.status(404).json({
          status: "error",
          msg: "Users are not allowed to downvote their own posts!",
        });
      } else {
        post = postService.downvotePost(userId, post);
        if (post == null) {
          return res.status(404).json({
            status: "error",
            msg: "Users can only downvote a post ONCE!",
          });
        } else {
          return res.status(200).json({
            status: "success",
            msg: "Post has been downvoted!",
            data: post,
          });
        }
      }
    } catch (err) {
      return res.status(404).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

const deletePost = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      const post = await postService.getPostByID(req.params.post_id);
      if (post == null) {
        return res.status(404).json({
          status: "error",
          msg: "Post is not found!",
        });
      }
      if (postService.isUserPost(post.userId, userId)) {
        const deletedCount = await postService.deletePost(req.params.post_id);
        if (deletedCount == 1) {
          return res.status(200).json({
            status: "success",
            msg: "Post has been deleted!",
          });
        }
      } else {
        return res.status(404).json({
          status: "error",
          msg: "User is not authorised to delete this post",
        });
      }
    } catch (err) {
      return res.status(404).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

const sortPostByAscVotes = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const posts = await postService.sortPostByVotes(req.params.topic, 1);
      if (posts.length == 0) {
        return res.status(200).json({
          status: "success",
          msg: `There are no posts under this topic: ${req.params.topic}`,
          data: posts,
        });
      } else {
        return res.status(200).json({
          status: "success",
          msg: "Posts retrieved successfully!",
          data: posts,
        });
      }
    } catch (err) {
      return res.status(404).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

const sortPostByDescVotes = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const posts = await postService.sortPostByVotes(req.params.topic, -1);
      if (posts.length == 0) {
        return res.status(200).json({
          status: "success",
          msg: `There are no posts under this topic: ${req.params.topic}`,
          data: posts,
        });
      } else {
        return res.status(200).json({
          status: "success",
          msg: "Posts retrieved successfully!",
          data: posts,
        });
      }
    } catch (err) {
      return res.status(404).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

const sortPostByAscDate = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const posts = await postService.sortPostByDate(req.params.topic, 1);
      if (posts.length == 0) {
        return res.status(200).json({
          status: "success",
          msg: `There are no posts under this topic: ${req.params.topic}`,
          data: posts,
        });
      } else {
        return res.status(200).json({
          status: "success",
          msg: "Posts retrieved successfully!",
          data: posts,
        });
      }
    } catch (err) {
      return res.status(404).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

const sortPostByDescDate = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const posts = await postService.sortPostByDate(req.params.topic, -1);
      if (posts.length == 0) {
        return res.status(200).json({
          status: "success",
          msg: `There are no posts under this topic: ${req.params.topic}`,
          data: posts,
        });
      } else {
        return res.status(200).json({
          status: "success",
          msg: "Posts retrieved successfully!",
          data: posts,
        });
      }
    } catch (err) {
      return res.status(404).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

export default {
  createPost,
  viewUserPosts,
  updatePost,
  viewPost,
  upvotePost,
  deletePost,
  downvotePost,
  sortPostByAscVotes,
  sortPostByDescVotes,
  sortPostByAscDate,
  sortPostByDescDate,
};
