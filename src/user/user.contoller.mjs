import express from "express";
import * as userModelService from "./user.model.service";
import cors from "cors";

const app = express();
app.use(cors());

const postController = express.Router();
