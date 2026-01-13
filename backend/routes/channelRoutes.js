import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createChannel,
  getMyChannel
} from "../controllers/channelController.js";

const router = express.Router();

// CREATE CHANNEL
router.post("/", authMiddleware, createChannel);

// GET MY CHANNEL
router.get("/me", authMiddleware, getMyChannel);

export default router;
