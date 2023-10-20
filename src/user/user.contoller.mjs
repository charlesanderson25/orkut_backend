import express from "express";
import cors from "cors";
import { listLatestFriends, readUser } from "./user.model.service.mjs";

const app = express();
app.use(cors());

const userController = express.Router();

userController.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await readUser(userId);
  res.status(200).json(user);
});

userController.get("/:userId/friends", async (req, res) => {
  const userId = req.params.userId;
  const friends = await listLatestFriends(userId);
  res.status(200).json(friends);
});

export default userController;
