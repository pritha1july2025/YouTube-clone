import express from "express";
import {
  uploadVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
  getAllVideos,
  getVideoById, 
  addComment, 
  editComment ,
  deleteComment  
} from "../controllers/videoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getAllVideos);
router.get("/:id", getVideoById);

// PROTECTED
router.post("/", authMiddleware, uploadVideo);
router.delete("/:id", authMiddleware, deleteVideo);
router.put("/:id/like", authMiddleware, likeVideo);
router.put("/:id/dislike", authMiddleware, dislikeVideo);
router.post("/:videoId/comments", authMiddleware, addComment); 
router.put(  "/:videoId/comments/:commentId",  authMiddleware,  editComment);
router.delete(  "/:videoId/comments/:commentId",  authMiddleware,  deleteComment);
export default router;
