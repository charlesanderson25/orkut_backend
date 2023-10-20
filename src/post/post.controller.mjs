import express from "express";
import {
  createPost,
  createPostComment,
  deletePost,
  listPostComments,
  listPosts,
  readPost,
  updatePost,
} from "./post.model.service.mjs";
import cors from "cors";

const app = express();
app.use(cors());

const postController = express.Router();

postController.get("/", async (req, res) => {
  const orderBy = req.query.order_by || "desc";
  const search = req.query.search || null;
  const posts = await listPosts(orderBy, search);
  res.status(200).json(posts);
});

//Read Post
postController.get("/:id", async (req, res) => {
  const postId = req.params.id;
  const post = await readPost(postId);
  res.status(200).json(post);
});

//Create Post

postController.post("/", async (req, res) => {
  const postData = req.body;
  const post = await createPost(postData);
  res.status(200).json(post);
});

// Delete Post
postController.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  const post = await deletePost(postId);
  res.status(200).json(post);
});

postController.put("/:id", async (req, res) => {
  const postData = req.body;
  const postId = req.params.id;
  const post = await updatePost(postId, postData);
  res.status(200).json(post);
});

// Lista comentários
postController.get("/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const comments = await listPostComments(postId);
  res.status(200).json(comments);
});

//Adiciona comentários

postController.post("/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const commentData = req.body;
  const comment = await createPostComment(postId, commentData);
  res.status(201).json(comment);
});

export default postController;
