import express from "express";
import {
  addComment,
  getVideoComments,
  deleteComment,updateComment
} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();

// Add comment to a video (PROTECTED)
router.post("/:videoId", authMiddleware, addComment);

// Get all comments for a video (PUBLIC)
router.get("/:videoId", getVideoComments);

// Delete comment (PROTECTED)
router.delete("/:id", authMiddleware, deleteComment);

//Update comment  (PROTECTED)
router.put("/:id", authMiddleware, updateComment);


export default router;
