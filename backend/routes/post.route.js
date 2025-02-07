import express from "express";
import {createComment, createPost, deletePost, getFeedPosts, getPostById, likePost} from "../controllers/post.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getFeedPosts)
router.post("/create", protectRoute, createPost);
router.post("/delete/:id", protectRoute, deletePost);
router.get("/:id", protectRoute, getPostById);
router.post("/:id/comment", protectRoute, createComment);
router.post("/:id/like", protectRoute, likePost);

export default router;  