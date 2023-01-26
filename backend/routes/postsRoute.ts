import express from "express";
const router = express.Router();
import {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
} from "../controllers/postsController";

router
  .get("/", getPosts)
  .get("/:id", getPost)
  .post("/", addPost)
  .delete("/:id", deletePost)
  .put("/:id", updatePost)
export default router;
