import express from "express";
import {
  createPost,
  deletePost,
  listPosts,
  readPost,
  updatePost,
} from "./post.model.service.mjs";
import cors from "cors";

const app = express();
app.use(cors());

const postController = express.Router();

postController.get("/", async (req, res) => {
  // const limit = Number(req.query.limit) ?? 30; - adiciona paginação
  // const offset = Number(req.query.offset) ?? 0;
  // console.log(limit, typeof limit);
  // console.log(offset, typeof offset);
  // const posts = await listPosts({ limit, offset });
  const posts = await listPosts();
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

export default postController;
